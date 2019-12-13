import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './../../../../../containers/Layout/Header';
import Button from './../../../../../components/Form/Button';
import scanQrCodeActions from '../../../../../actions/ScanQrCodeActions';
import web3Service from '../../../../../services/Web3Service';
import notificationActions from '../../../../../actions/NotificationActions';
import { SDC } from '../../../../../constants/CurrencyConstants';
import TransactionBuilder from '../../../../../components/TransactionBuilder';
import history from '../../../../../history';
import { DASHBOARD_PATH, SEND_TRANSACTION_PATH } from '../../../../../constants/RouterConstants';
import transactionHistoryActions from '../../../../../actions/TransactionHistoryActions';
import escrowActions from '../../../../../actions/EscrowActions';
import { INVALID_QR_CODE_FOR_PAYMENT_ERROR } from '../../../../../constants/ErrorConstants';

const PayToEscrow = ({
	scanQrCode, showErrorNotification, setSelectedEscrow, selectedEscrow, proxyPayment,
}) => {
	useEffect(() => {
		scanQrCode({
			description: 'Scan Payment QR code to pay',
			title: 'Scan',
			onScan: async (qrCodeData) => {
				try {
					const data = web3Service.parseUrl(qrCodeData, 'escrow', INVALID_QR_CODE_FOR_PAYMENT_ERROR);
					setSelectedEscrow(null, data.address);

				} catch (e) {
					showErrorNotification({ text: e.message, button: 'OK' });
					history.push(SEND_TRANSACTION_PATH);
				}
			},
			onClose: () => {
				history.push(SEND_TRANSACTION_PATH);
			},
		});
	}, []);

	if (!selectedEscrow.address) {
		return (<div><Header title="Scan" backButton={() => history.push(SEND_TRANSACTION_PATH)} /></div>);
	}
	return (
		<TransactionBuilder
			handleTransaction={() => proxyPayment(selectedEscrow.address)}
			onDone={() => history.push(DASHBOARD_PATH)}
		>
			{({ submitTransaction }) => (
				<React.Fragment>
					<Header title={selectedEscrow.address ? 'Payment details' : ''} backButton={() => history.push(SEND_TRANSACTION_PATH)} />
					<div className="dashboard payment-details-page">
						<div className="dashboard-stripe">
							<div className="dashboard-stripe__title">Currency</div>
							<div className="dashboard-stripe__text">{SDC}</div>
						</div>
						<div className="dashboard-stripe">
							<div className="dashboard-stripe__title">Address</div>
							<div className="dashboard-stripe__text">{selectedEscrow.address}</div>
						</div>
						<div className="dashboard-stripe">
							<div className="dashboard-stripe__title">Amount to pay</div>
							<div className="dashboard-stripe__text">{selectedEscrow.SDCPrice}</div>
						</div>
						<div className="dashboard-stripe__text last-child">Fee will be paid by Retailer</div>
						<div className="dashboard-controls">
							<Button
								onClick={(e) => {
									e.preventDefault();
									submitTransaction();
								}}
								className="is-large"
							>Send
							</Button>
						</div>
					</div>
				</React.Fragment>
			)}
		</TransactionBuilder>
	);
};

PayToEscrow.propTypes = {
	scanQrCode: PropTypes.func.isRequired,
	showErrorNotification: PropTypes.func.isRequired,
	setSelectedEscrow: PropTypes.func.isRequired,
	proxyPayment: PropTypes.func.isRequired,
	selectedEscrow: PropTypes.object.isRequired,
};

export default connect(
	(state) => ({
		selectedEscrow: state.transactionsHistory.get('selectedEscrow').toJS(),
	}),
	(dispatch) => ({
		setSelectedEscrow: (item, address) => dispatch(transactionHistoryActions.setSelectedEscrow(item, address)),
		scanQrCode: (params) => dispatch(scanQrCodeActions.scan(params)),
		showErrorNotification: (currency) => dispatch(notificationActions.errorNotification(currency)),
		proxyPayment: (escrowAddress) => dispatch(escrowActions.proxyPayment(escrowAddress)),
	}),
)(PayToEscrow);
