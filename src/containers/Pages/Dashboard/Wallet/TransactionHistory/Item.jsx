import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import history from '../../../../../history';

import web3Service from '../../../../../services/Web3Service';
import { GET_ESCROW_QRCODE, TRANSACTION_DETAILS } from '../../../../../constants/RouterConstants';
import Button from '../../../../../components/Form/Button';
import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';
import { CONTRACT_ESCROW_FACTORY } from '../../../../../constants/ContractConstants';

const onItemClick = (e, item, setSelectedTransaction) => {
	e.preventDefault();
	setSelectedTransaction(item);
	history.push(TRANSACTION_DETAILS);
};

const onGetQRClick = async (item, setSelectedTransaction) => {
	setSelectedTransaction(item);
	history.push(GET_ESCROW_QRCODE);
};

const Item = ({
	item, address, selectedCurrency, setSelectedEscrow, isPending, setSelectedTransaction,
}) => {

	const isSend = item.from.toLowerCase() === address.toLowerCase();
	let title = null;
	let text = null;

	if (isPending) {
		title = 'Confirmation';
		text = isSend ? 'Send' : 'Received';
	} else {
		title = isSend ? 'Send' : 'Received';
		text = moment(item.utc || item.timestamp).format('MMM DD, HH:mm');
	}

	return item.to && CONTRACT_ESCROW_FACTORY === item.to.toLowerCase() ? (
		<a href="#" onClick={(e) => e.preventDefault()} className="transaction-history__row transaction-history__notification">
			<div className="transaction-history__row-information flex-center">
				<i className="is-icon bell-icon" />
				<div className="information-details">QR code is ready</div>
			</div>
			<Button onClick={() => onGetQRClick(item, setSelectedEscrow)} className="qr-code-button">
				<span>Get QR</span>
			</Button>
		</a>
	) : (
		<a href="#" onClick={(e) => onItemClick(e, item, setSelectedTransaction)} className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className={classNames('is-icon', { 'received-arrow-icon': !isSend && !isPending, 'send-arrow-icon': isSend && !isPending, 'confirmation-icon': isPending })} />
				<div className="information-details">
					<p className="information-details__title">{title}</p>
					<p className="information-details__text">{text}</p>
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
	isPending: PropTypes.bool.isRequired,
	setSelectedEscrow: PropTypes.func.isRequired,
	setSelectedTransaction: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		address: state.account.get('address'),
	}),
	(dispatch) => ({
		setSelectedEscrow: (item) => dispatch(transactionHistoryActions.setSelectedEscrow(item)),
		setSelectedTransaction: (item) => dispatch(transactionHistoryActions.setSelectedTransaction(item)),
	}),
)(Item);
