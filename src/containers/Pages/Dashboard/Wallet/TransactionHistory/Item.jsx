import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import history from '../../../../../history';
import web3Service from '../../../../../services/Web3Service';
import { TRANSACTION_DETAILS } from '../../../../../constants/RouterConstants';
import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';

const onItemClick = (e, item, setSelectedTransaction) => {
	e.preventDefault();
	setSelectedTransaction(item);
	history.push(TRANSACTION_DETAILS);
};

const Item = ({
	item, address, selectedCurrency, setSelectedTransaction,
}) => {
	const isSend = item.from.toLowerCase() === address.toLowerCase();

	return (
		<a href="#" onClick={(e) => onItemClick(e, item, setSelectedTransaction)} className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className={classNames('is-icon', { 'received-arrow-icon': !isSend, 'send-arrow-icon': isSend })} />
				<div className="information-details">
					<p className="information-details__title">{isSend ? 'Send' : 'Received'}</p>
					<p className="information-details__text">{moment(item.utc || item.timestamp).format('MMM DD, HH:mm')}</p>
				</div>
			</div>
			<div className="transaction-history__row-value">
				{web3Service.fromWei(item.value, 'ether').toString(10)}<span className="postfix">{selectedCurrency}</span>
			</div>
		</a>
	);
};

Item.propTypes = {
	selectedCurrency: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	setSelectedTransaction: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		address: state.account.get('address'),
	}),
	(dispatch) => ({
		setSelectedTransaction: (item) => dispatch(transactionHistoryActions.setSelectedTransaction(item)),
	}),
)(Item);
