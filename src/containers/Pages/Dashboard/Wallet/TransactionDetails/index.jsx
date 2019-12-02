import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import moment from 'moment';

import history from '../../../../../history';

import Header from './../../../../Layout/Header';
import web3Service from '../../../../../services/Web3Service';
import { DASHBOARD_PATH } from '../../../../../constants/RouterConstants';


const TransactionDetails = ({ selectedCurrency, address, selectedTransaction }) => (selectedTransaction && Object.keys(selectedTransaction).length ? (
	<React.Fragment>
		<Header backButton={() => history.push(DASHBOARD_PATH)} className="header-transaction-details">
			<div className="header-transaction-details__title">
				{web3Service.fromWei(selectedTransaction.value, 'ether').toNumber()}<div className="postfix">{selectedCurrency}</div>
			</div>
			<div className="header-transaction-details__text">
				<p>{selectedTransaction.from === address ? 'Send' : 'Received'}</p>
			</div>
		</Header>
		<div className="dashboard transaction-details-page">
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Date</div>
				<div className="dashboard-stripe__text">{moment(selectedTransaction.utc).format('MMM DD, HH:mm')}</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">From</div>
				<div className="dashboard-stripe__text">{selectedTransaction.from}</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">To</div>
				<div className="dashboard-stripe__text">{selectedTransaction.to}</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Transaction hash</div>
				<div className="dashboard-stripe__text">{selectedTransaction.hash || selectedTransaction.transaction_hash}</div>
			</div>
		</div>
	</React.Fragment>
) : <Redirect to={DASHBOARD_PATH} />);

TransactionDetails.propTypes = {
	selectedCurrency: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	selectedTransaction: PropTypes.object,
};

TransactionDetails.defaultProps = {
	selectedTransaction: {},
};

export default connect(
	(state) => ({
		selectedCurrency: state.account.get('selectedCurrency'),
		address: state.account.get('address'),
		selectedTransaction: state.transactionsHistory.get('selectedTransaction').toJS(),
	}),
	() => ({}),
)(TransactionDetails);
