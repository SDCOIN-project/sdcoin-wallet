import React from 'react';
import Header from './../../containers/Layout/Header';
import Sidebar from './../../containers/Layout/Sidebar';

const ScanQrCode = () => (
	<React.Fragment>
		<Header backButton={false} title="Scan QR code" />
		<div className="dashboard scan-qr-code-page">
			<div className="scan-qr-code-page__text">Scan QRcode to get recipient address</div>
			<div className="scan-qr-code-page__container">
				<img className="img-placeholder" src="/images/photo-qrCode-placeholder.jpg" alt="Placeholder for QR Code " />
			</div>
		</div>
		<Sidebar />
	</React.Fragment>
);

export default ScanQrCode;
