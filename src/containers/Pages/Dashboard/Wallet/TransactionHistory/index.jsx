import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';
import InfiniteScroll from './InfiniteScroll';
import Loading from '../../../../../components/Loading';

const TransactionHistory = ({
	getNextTransactions, selectedCurrency, list, pendingList, hasMore, parent, loading, subLoading,
}) => {

	if (loading) {
		return <Loading className="loading-container-balances" />;
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
						No Transaction History yet.
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
