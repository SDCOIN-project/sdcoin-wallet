import moment from 'moment';
import BaseActions from './BaseActions';
import TransactionHistoryReducer from '../reducers/TransactionHistoryReducer';
import { CURRENCIES, ETH, TOKEN_ADDRESS } from '../constants/CurrencyConstants';
import escrowActions from './EscrowActions';
import cryptoApiService from '../services/CryptoApiService';

class TransactionHistoryActions extends BaseActions {

	/**
	 * Get transaction history for particular address and currency from server
	 * @returns {Function}
	 */
	getTransactions() {
		return async (dispatch, getState) => {

			const count = getState().transactionsHistory.get('count');
			const address = getState().account.get('address');

			const transactionsHistory = await Promise.all(CURRENCIES.map((currency) =>
				cryptoApiService.getTransfers(currency, address, 0, count)))
				.finally(() => {
					dispatch(this.setValue('loading', false));
				});

			CURRENCIES.forEach((currency, index) => {
				const history = transactionsHistory[index];
				const path = ['currencies', currency];
				dispatch(this.setValue([...path, 'list'], history.items));

				dispatch(this.setValue([...path, 'hasMore'], history.items.length < history.count));

			});
		};
	}

	subscribeToTransactions(address) {
		return async (dispatch, getState) => {
			await cryptoApiService.subscribeToTransactions(address, (data) => {
				const list = getState().transactionsHistory.getIn(['currencies', ETH, 'list']).unshift(data);
				dispatch(this.setValue(['currencies', ETH, 'list'], list));

				dispatch(this.reducer.actions.checkInPendingList({ currency: ETH, hash: data.hash }));
				dispatch(escrowActions.checkIsTxToEscrowFactory(data));
			});
		};
	}

	subscribeToTokenTransactions(address, currency) {
		return async (dispatch, getState) => {
			await cryptoApiService.subscribeToTokenTransfers(TOKEN_ADDRESS[currency], address, (data) => {
				const list = getState().transactionsHistory.getIn(['currencies', currency, 'list']).unshift(data);
				dispatch(this.setValue(['currencies', currency, 'list'], list));
				dispatch(this.reducer.actions.checkInPendingList({ currency, hash: data.transaction_hash }));
			});
		};
	}

	addPendingTransaction({
		currency, to, from, value, hash,
	}) {
		return (dispatch, getState) => {
			const list = getState().transactionsHistory.getIn(['currencies', currency, 'pendingList']).unshift({
				utc: moment.utc().format(),
				to,
				from,
				hash,
				value,
			});

			dispatch(this.setValue(['currencies', currency, 'pendingList'], list));
		};
	}

	/**
	 * Get next part transaction history for particular address and currency from server
	 * @returns {Function}
	 */
	getNextTransactions() {
		return async (dispatch, getState) => {

			const count = getState().transactionsHistory.get('count');
			const currency = getState().account.get('selectedCurrency');
			const path = ['currencies', currency];
			const hasMore = getState().transactionsHistory.getIn([...path, 'hasMore']);
			if (!hasMore) {
				return;
			}

			const isLoadingNow = getState().transactionsHistory.getIn([...path, 'loading']);

			if (isLoadingNow) {
				return;
			}
			dispatch(this.setValue([...path, 'loading'], true));

			const countExists = getState().transactionsHistory.getIn([...path, 'list']).size;
			const address = getState().account.get('address');

			const transactions = await cryptoApiService.getTransfers(currency, address, countExists, count);

			let list = getState().transactionsHistory.getIn([...path, 'list']).toJS();
			list = list.concat(transactions.items);
			dispatch(this.setValue([...path, 'list'], list));
			dispatch(this.setValue([...path, 'hasMore'], list.length < transactions.count));
			dispatch(this.setValue([...path, 'loading'], false));
		};
	}

	/**
	 * Set selected transaction
	 * @param {object} transaction
	 * @returns {Function}
	 */
	setSelectedTransaction(transaction) {
		return (dispatch) => {
			if (!transaction) return;
			dispatch(this.setValue('selectedTransaction', transaction, true));
		};
	}

}

const transactionHistoryActions = new TransactionHistoryActions(TransactionHistoryReducer);
export default transactionHistoryActions;

