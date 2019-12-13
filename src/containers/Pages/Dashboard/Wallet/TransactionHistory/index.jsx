import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';
import InfiniteScroll from './InfiniteScroll';
import Loading from '../../../../../components/Loading';
import { ETH } from '../../../../../constants/CurrencyConstants';
import { CONTRACT_ESCROW_FACTORY } from '../../../../../constants/ContractConstants';
import GetPaymentButton from '../../../../../components/Notifications/Buttons/GetPayment';

const TransactionHistory = ({
	getNextTransactions, selectedCurrency, list, pendingList, hasMore, parent, loading, subLoading, unclaimedBalance, unclaimedBalanceNotifyId,
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
		<TransitionGroup>
			<CSSTransition
				in
				appear
				timeout={500}
				classNames="transaction-history-transition"
			>
				<div className="transaction-history">
					<div className="transaction-history__title">
				Transaction History
						<span className="title-inner"><span className="title-inner-dot">·</span>{selectedCurrency}</span>
					</div>
					{(unclaimedBalance) ? (
						<a href="#" onClick={(e) => e.preventDefault()} className="transaction-history__row transaction-history__notification">
							<div className="transaction-history__row-information flex-center">
								<i className="is-icon bell-icon" />
								<div className="information-details">You have new incoming payment</div>
							</div>
							<GetPaymentButton id={unclaimedBalanceNotifyId} />
						</a>
					) : null}
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
			</CSSTransition>
		</TransitionGroup>
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
	unclaimedBalance: PropTypes.number.isRequired,
	unclaimedBalanceNotifyId: PropTypes.string.isRequired,
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
		unclaimedBalance: state.escrow.get('unclaimedBalance'),
		unclaimedBalanceNotifyId: state.escrow.get('unclaimedBalanceNotifyId'),
	}),
	(dispatch) => ({
		getNextTransactions: () => dispatch(transactionHistoryActions.getNextTransactions()),
	}),
)(TransactionHistory);
