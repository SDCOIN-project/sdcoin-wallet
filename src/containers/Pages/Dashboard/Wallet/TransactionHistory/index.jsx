import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';
import InfiniteScroll from './InfiniteScroll';
import Loading from '../../../../../components/Loading';

const TransactionHistory = ({
	address, getTransactions, balances, selectedCurrency, list, hasMore, parent, loading,
}) => {
	useEffect(() => {
		getTransactions(address);
		// TODO: May be rewrite to another logic, also check if self transaction
	}, [balances[selectedCurrency], selectedCurrency]);
	if (loading) return <Loading className="loading-container-balances" />;
	return (
		<div className="transaction-history">
			<div className="transaction-history__title">Transaction History</div>
			{
				list && list.length ? (
					<InfiniteScroll
						list={list}
						address={address}
						hasMore={hasMore}
						selectedCurrency={selectedCurrency}
						parent={parent}
						getTransactions={getTransactions}
					/>
				) : (
					<div className="transaction-history__empty">
						No Transaction History yet.
					</div>
				)
			}
			{/* Block notification  */}
			{/* <a href="#" className="transaction-history__row transaction-history__notification">
				<div className="transaction-history__row-information">
					<i className="is-icon bell-icon" />
					<div className="information-details mt-2">You have new incoming payment</div>
				</div>
				<Button className="qr-code-button">
					<i className="is-icon qr-code-small-white-icon" />
					<span>Get Payment</span>
				</Button>
			</a>
			<a href="#" className="transaction-history__row transaction-history__notification">
				<div className="transaction-history__row-information flex-center">
					<i className="is-icon bell-icon" />
					<div className="information-details">QR code is ready</div>
				</div>
				<Button className="qr-code-button">
					<span>Get QR</span>
				</Button>
			</a>
			<a href="#" className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon confirmation-icon" />
					<div className="information-details">
						<p className="information-details__title">Confirmation</p>
						<p className="information-details__text">Wait please...</p>
					</div>
				</div>
				<div className="transaction-history__row-value">0.03<span className="postfix">SDC</span></div>
			</a>
			<div className="loading-container">
				<i className="loading loading-blue-icon" />
			</div> */}
		</div>
	);
};

TransactionHistory.propTypes = {
	list: PropTypes.array,
	hasMore: PropTypes.bool,
	loading: PropTypes.bool,
	selectedCurrency: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	balances: PropTypes.object.isRequired,
	getTransactions: PropTypes.func.isRequired,
	parent: PropTypes.func.isRequired,
};

TransactionHistory.defaultProps = {
	list: [],
	hasMore: false,
	loading: false,
};

export default connect(
	(state) => ({
		list: state.transaction.get('list').toJS(),
		hasMore: state.transaction.get('hasMore'),
		loading: state.transaction.get('loading'),
		selectedCurrency: state.account.get('selectedCurrency'),
		address: state.account.get('address'),
		balances: state.account.get('balances').toJS(),
	}),
	(dispatch) => ({
		getTransactions: (address, isScroll) => dispatch(transactionHistoryActions.getTransactions(address, isScroll)),
	}),
)(TransactionHistory);
