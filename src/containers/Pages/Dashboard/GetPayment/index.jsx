import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BN from 'bignumber.js';
import Header from './../../../../containers/Layout/Header';
import Button from './../../../../components/Form/Button';
import scanQrCodeActions from '../../../../actions/ScanQrCodeActions';
import web3Service from '../../../../services/Web3Service';
import notificationActions from '../../../../actions/NotificationActions';
import { PLUS_PERCENT_FEE } from '../../../../constants/TransactionConstants';
import ethService from '../../../../services/EthService';
import { ETH } from '../../../../constants/CurrencyConstants';
import escrowActions from '../../../../actions/EscrowActions';
import TransactionBuilder from '../../../../components/TransactionBuilder';
import history from '../../../../history';
import { DASHBOARD_PATH } from '../../../../constants/RouterConstants';

const GetPayment = ({
	scanQrCode, showErrorNotification, withdrawEstimateGas, withdraw,
}) => {

	const [address, setAddress] = useState(null);
	const [gas, setGas] = useState(0);
	const [gasPrice, setGasPrice] = useState(0);

	ethService.getGasPrice().then((data) => setGasPrice(data));
	const fee = new BN(gas).times(gasPrice).toString(10);

	const updateGas = async (escrow) => {
		if (escrow) {
			const data = await withdrawEstimateGas(escrow);
			setGas(data * PLUS_PERCENT_FEE);
		}
	};

	if (!address) {
		scanQrCode({
			description: 'Scan QRcode to receive new payment',
			title: 'Get payment',
			onScan: (qrCodeData) => {
				try {
					const data = web3Service.parseUrl(qrCodeData, 'escrow');
					setAddress(data.address);
					updateGas(data.address);
				} catch (e) {
					showErrorNotification({ text: e.message, button: 'OK' });
					history.push(DASHBOARD_PATH);
				}
			},
			onClose: () => {
				history.push(DASHBOARD_PATH);
			},
		});
	}

	return (
		<TransactionBuilder
			handleTransaction={() => withdraw(address)}
			onDone={() => history.push(DASHBOARD_PATH)}
		>
			{({ submitTransaction }) => (
				<React.Fragment>
					<Header title="Receive" />
					<div className="dashboard receive-page payment-info-page">
						<div className="transaction-information__title">Estimated fee</div>
						<div className="transaction-information__value mt-3">
							{web3Service.fromWeiToEther(fee)} <span className="dashboard-form__row-postfix">{ETH}</span>
						</div>

						<div className="dashboard-controls">
							<Button
								onClick={(e) => {
									e.preventDefault();
									submitTransaction();
								}}
								className="is-wide"
							>
								Request payment
							</Button>
						</div>
					</div>
				</React.Fragment>
			)}
		</TransactionBuilder>
	);
};

GetPayment.propTypes = {
	scanQrCode: PropTypes.func.isRequired,
	showErrorNotification: PropTypes.func.isRequired,
	withdrawEstimateGas: PropTypes.func.isRequired,
	withdraw: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		withdrawEstimateGas: (contract) => dispatch(escrowActions.withdrawEstimateGas(contract)),
		scanQrCode: (params) => dispatch(scanQrCodeActions.scan(params)),
		showErrorNotification: (currency) => dispatch(notificationActions.errorNotification(currency)),
		withdraw: (contract) => dispatch(escrowActions.withdraw(contract)),
	}),
)(GetPayment);
