import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import BN from 'bignumber.js';
import Header from '../../../Layout/Header';
import { DASHBOARD_PATH } from '../../../../constants/RouterConstants';
import history from '../../../../history';
import web3Service from '../../../../services/Web3Service';
import {
	SDC,
	LUV,
	LUV_EXCHANGE_RATE,
	TOKEN_ADDRESS,
} from '../../../../constants/CurrencyConstants';
import swapService from '../../../../services/contracts/SwapService';
import QRCodeService from '../../../../services/QRCodeService';
import GlobalActions from '../../../../actions/GlobalActions';

const EscrowQrCode = ({ selectedTransaction, shareImage }) => {
	const [qrCode, setQrCode] = useState('');
	const [SDCAmountInLUV, setSDCAmountInLUV] = useState(0);

	const changeQRCode = ({ amount, currency }) => {
		const result = {};
		result.address = TOKEN_ADDRESS[currency];
		if (amount) {
			result.uint256 = amount;
		}
		QRCodeService.encode(`ethereum:escrow-${selectedTransaction.to}/transfer?${qs.stringify(result)}`).then((data) => setQrCode(data));
	};

	useEffect(() => {
		swapService.getSdcExchangeRate().then((data) => {
			if (selectedTransaction && Object.keys(selectedTransaction).length) {
				const amountInLuv = web3Service.fromWei(
					`${new BN(selectedTransaction.value).multipliedBy(parseInt(data, 10)).dividedBy(LUV_EXCHANGE_RATE).toString(10)}`,
					'ether',
				).toString(10);
				setSDCAmountInLUV(amountInLuv);
				changeQRCode({
					currency: SDC,
					amount: selectedTransaction.value,
				});
			}
		});
	}, []);

	if (!selectedTransaction || !Object.keys(selectedTransaction).length) return <Redirect to={DASHBOARD_PATH} />;

	return (
		<React.Fragment>
			<Header backButton={() => history.push(DASHBOARD_PATH)} title="Receive" />
			<div className="dashboard receive-page payment-info-page">
				<div className="transaction-information__title">Amount</div>
				<div className="transaction-information__value mt-3">
					{SDCAmountInLUV}
					<span className="postfix">{LUV}</span>
				</div>
				<div className="scan-qr-code-block payment-info">
					{qrCode ? <img className="img-placeholder" src={qrCode} alt="Placeholder qr code" /> : 'QR code unavailable'}
				</div>
				<a href="#" onClick={(e) => { e.preventDefault(); shareImage(qrCode); }} className="receive-page__text-signature">Share Payment QR code</a>

			</div>
		</React.Fragment>
	);
};

EscrowQrCode.propTypes = {
	selectedTransaction: PropTypes.object,
	shareImage: PropTypes.func.isRequired,
};

EscrowQrCode.defaultProps = {
	selectedTransaction: {},
};

export default connect(
	(state) => ({
		selectedTransaction: state.transactionsHistory.get('selectedTransaction').toJS ? state.transactionsHistory.get('selectedTransaction').toJS() : state.transactionsHistory.get('selectedTransaction'),
	}),
	(dispatch) => ({
		shareImage: (image) => dispatch(GlobalActions.shareImage(image)),
	}),
)(EscrowQrCode);
