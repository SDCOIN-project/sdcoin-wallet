import React from 'react';
import Header from './../../../../../containers/Layout/Header';

const PaymentInfo1 = () => (

	<React.Fragment>
		<Header title="Receive" />
		<div className="dashboard receive-page payment-info-page">
			<div className="transaction-information__title">Amount</div>
			<div className="transaction-information__value mt-3">100<span className="postfix">LUV</span></div>
			<div className="scan-qr-code-block payment-info">
				<img className="img-placeholder" src="../images/placeholder-qr-code.svg" alt="Placeholder qr code" />
			</div>
			<a href="#" className="receive-page__text-signature">Share Payment QR code</a>

		</div>
	</React.Fragment>
);

export default PaymentInfo1;
