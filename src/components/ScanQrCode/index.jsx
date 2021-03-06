import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './../../containers/Layout/Header';
import scanQrCodeActions from './../../actions/ScanQrCodeActions';

import qrScannerService from '../../services/QRScannerService';

const ScanQrCode = ({
	show, title, description, setValue, onScan, onClose,
}) => {
	const [error, setError] = useState(null);

	const hide = () => {
		setValue('show', false);
	};

	const closeScanQRWindow = () => {
		hide();
		onClose();
	};

	const destroyCamera = async () => {
		try {
			document.removeEventListener('backbutton', closeScanQRWindow, false);
			await qrScannerService.destroy();
		} catch (err) {
			setError(err.message);
		}
	};

	const initialCamera = async () => {
		try {
			document.addEventListener('backbutton', closeScanQRWindow, false);
			setError(null);
			await qrScannerService.prepare();
			await qrScannerService.show();
			const data = await qrScannerService.scan();
			onScan(data);
			hide();
		} catch (err) {
			destroyCamera();
			setError(err.message);
		}
	};

	useEffect(() => {
		if (show) {
			initialCamera();
		}

		return () => {
			if (show) {
				destroyCamera();
			}
		};
	}, [show]);

	const style = !show ? { display: 'none' } : {};

	return (
		<div className={`scan-wrapper ${show ? 'show-top' : ''}`} style={style}>
			<Header backButton={() => { closeScanQRWindow(); }} title={title} />
			<div className="dashboard scan-qr-code-page">
				<div className="scan-qr-code-page__text">{description}</div>
				<div className="scan-qr-code-page__wrapper">
					<div className="left-wrapper" />
					<div className="scan-qr-code-page__container">
						<div className="white-border" />
					</div>
					<div className="right-wrapper" />
				</div>
				<div className="scan-qr-code-page__bottom-block">
					{error && <div className="scan-qr-code-page__error">{error}</div>}
				</div>
			</div>
		</div>
	);

};

ScanQrCode.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	onScan: PropTypes.func,
	onClose: PropTypes.func,
	setValue: PropTypes.func.isRequired,
};

ScanQrCode.defaultProps = {
	title: 'Scan QR code',
	description: '',
	onScan: () => {},
	onClose: () => {},
};

export default connect(
	(state) => ({
		show: state.scanQrCode.get('show'),
		title: state.scanQrCode.get('title'),
		description: state.scanQrCode.get('description'),
		onScan: state.scanQrCode.get('onScan'),
		onClose: state.scanQrCode.get('onClose'),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(scanQrCodeActions.setValue(field, value)),
	}),
)(ScanQrCode);
