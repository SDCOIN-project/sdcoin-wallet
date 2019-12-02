import BaseActions from './BaseActions';
import TransactionHistoryReducer from '../reducers/TransactionHistoryReducer';
import * as TransactionApi from '../api/TransactionApi';
import { CONTRACT_ADDRESSES, CURRENCIES, ETH } from '../constants/CurrencyConstants';

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
				TransactionApi.getTransactions(address, { currencyType: currency, offset: 0, count })))
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

			const transactions = await TransactionApi.getTransactions(address, {
				currencyType: currency,
				offset: countExists,
				count,
			});

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
			dispatch(this.setValue('selectedTransaction', transaction));
		};
	}

	/**
	 * Init socket events by new transaction
	 * @returns {Function}
	 */
	initSocketEvents() {
		return (dispatch, getState) => {
			const socket = getState().global.get('socket');
			socket.on('new_transaction', (data) => {
				const list = getState().transactionsHistory.getIn(['currencies', ETH, 'list']).unshift(data);
				dispatch(this.setValue(['currencies', ETH, 'list'], list));
			});
			socket.on('new_transfer', (data) => {
				const token = CONTRACT_ADDRESSES[data.address];
				const list = getState().transactionsHistory.getIn(['currencies', token, 'list']).unshift(data);
				dispatch(this.setValue(['currencies', token, 'list'], list));
			});
		};
	}

}

const transactionHistoryActions = new TransactionHistoryActions(TransactionHistoryReducer);
export default transactionHistoryActions;

