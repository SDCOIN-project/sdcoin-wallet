import BaseActions from './BaseActions';
import TransactionHistoryReducer from '../reducers/TransactionHistoryReducer';
import * as TransactionApi from '../api/TransactionApi';

class TransactionHistoryActions extends BaseActions {

	/**
	 * Get transaction history for particular address and currency from server
	 * @param {string} address
	 * @param {boolean} isScroll
	 * @returns {Function}
	 */
	getTransactions(address, isScroll = false) {
		return async (dispatch, getState) => {
			const { transaction, account } = getState();
			if (!isScroll) {
				dispatch(this.setValue('loading', true));
			}
			const selectedCurrency = account.get('selectedCurrency');
			const start = isScroll ? transaction.get('start') : 0;
			const count = transaction.get('count');
			const oldList = transaction.get('list').toJS();
			const { items, count: all } = await dispatch(() => TransactionApi.getTransactions(address, {
				offset: start, count: count + 1, currencyType: selectedCurrency,
			}));
			if (items.length === count + 1) {
				items.pop();
				dispatch(this.setValue('hasMore', true));
			} else {
				dispatch(this.setValue('hasMore', false));
			}
			const resultList = isScroll ? [...oldList, ...items] : items;
			dispatch(this.setValue('list', resultList));
			dispatch(this.setValue('start', resultList.length));
			dispatch(this.setValue('all', all));
			if (!isScroll) {
				dispatch(this.setValue('loading', false));
			}
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

}

const transactionHistoryActions = new TransactionHistoryActions(TransactionHistoryReducer);
export default transactionHistoryActions;

