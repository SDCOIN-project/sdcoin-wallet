import React, { useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { connect } from 'react-redux';
import Header from '../../../Layout/Header';
import { DASHBOARD_PATH } from '../../../../constants/RouterConstants';
import history from '../../../../history';
import {
	SDC,
	LUV,
	TOKEN_ADDRESS,
} from '../../../../constants/CurrencyConstants';
import QRCodeService from '../../../../services/QRCodeService';
import GlobalActions from '../../../../actions/GlobalActions';
import escrowActions from '../../../../actions/EscrowActions';

const EscrowQrCode = ({ selectedEscrow, shareImage }) => {
	const [qrCode, setQrCode] = useState('');

	const params = {
		address: TOKEN_ADDRESS[SDC],
		uint256: selectedEscrow.price,
	};
	const qrCodeUrl = `ethereum:escrow-${selectedEscrow.address}/transfer?${qs.stringify(params)}`;

	QRCodeService.encode(qrCodeUrl).then((data) => setQrCode(data));

	return (
		<React.Fragment>
			<Header backButton={() => history.push(DASHBOARD_PATH)} title="Receive" />
			<div className="dashboard receive-page payment-info-page">
				<div className="transaction-information__title">Amount</div>
				<div className="transaction-information__value mt-3">
					{selectedEscrow.LUVPrice}
					<span className="postfix">{LUV}</span>
				</div>
				<div className="scan-qr-code-block payment-info">
					{qrCode ? <img className="img-placeholder" src={qrCode} alt="Placeholder qr code" /> : 'QR code unavailable'}
				</div>
				<a
					href="#"
					onClick={(e) => {
						e.preventDefault();
						shareImage(qrCode);
					}}
					className="receive-page__text-signature"
				>Share Payment QR code
				</a>

			</div>
		</React.Fragment>
	);
};

EscrowQrCode.propTypes = {
	selectedEscrow: PropTypes.object.isRequired,
	shareImage: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		selectedEscrow: state.transactionsHistory.get('selectedEscrow').toJS(),
	}),
	(dispatch) => ({
		shareImage: (image) => dispatch(GlobalActions.shareImage(image)),
		getEscrowAddressFromCreateTx: (hash) => dispatch(escrowActions.getEscrowAddressFromCreateTx(hash)),
	}),
)(EscrowQrCode);
