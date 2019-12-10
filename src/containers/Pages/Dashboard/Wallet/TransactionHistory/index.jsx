import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';
import InfiniteScroll from './InfiniteScroll';
import Loading from '../../../../../components/Loading';
import { ETH } from '../../../../../constants/CurrencyConstants';
import { CONTRACT_ESCROW_FACTORY } from '../../../../../constants/ContractConstants';

const TransactionHistory = ({
	getNextTransactions, selectedCurrency, list, pendingList, hasMore, parent, loading, subLoading,
}) => {

	if (loading) {
		return <Loading className="loading-container-balances" />;
	}

	if (selectedCurrency === ETH) {
		list = list.filter((row) => {
			if (!row.utc) {
				return false;
			}
			if (row.to && row.to.toLowerCase() === CONTRACT_ESCROW_FACTORY && !row.internal) {
				return true;
			}
			if (row.value.toString() === '0') {
				return false;
			}
			return true;
		});
	}

	return (
		<div className="transaction-history">
			<div className="transaction-history__title">Transaction History</div>
			{pendingList.length || list.length ? (
				<InfiniteScroll
					list={list}
					pendingList={pendingList}
					hasMore={hasMore}
					selectedCurrency={selectedCurrency}
					parent={parent}
					getTransactions={getNextTransactions}
					loading={subLoading}
				/>
			) : (
				<div className="transaction-history__empty">
						No transaction history yet.
				</div>
			)}
		</div>
	);
};

TransactionHistory.propTypes = {
	list: PropTypes.array,
	pendingList: PropTypes.array,
	hasMore: PropTypes.bool,
	loading: PropTypes.bool,
	subLoading: PropTypes.bool,
	selectedCurrency: PropTypes.string.isRequired,
	getNextTransactions: PropTypes.func.isRequired,
	parent: PropTypes.func.isRequired,
};

TransactionHistory.defaultProps = {
	list: [],
	pendingList: [],
	hasMore: false,
	loading: false,
	subLoading: false,
};

export default connect(
	(state) => ({
		list: state.transactionsHistory.getIn(['currencies', state.account.get('selectedCurrency'), 'list']).toJS(),
		pendingList: state.transactionsHistory.getIn(['currencies', state.account.get('selectedCurrency'), 'pendingList']).toJS(),
		hasMore: state.transactionsHistory.getIn(['currencies', state.account.get('selectedCurrency'), 'hasMore']),
		subLoading: state.transactionsHistory.getIn(['currencies', state.account.get('selectedCurrency'), 'loading']),
		loading: state.transactionsHistory.get('loading'),
		selectedCurrency: state.account.get('selectedCurrency'),
	}),
	(dispatch) => ({
		getNextTransactions: () => dispatch(transactionHistoryActions.getNextTransactions()),
	}),
)(TransactionHistory);
