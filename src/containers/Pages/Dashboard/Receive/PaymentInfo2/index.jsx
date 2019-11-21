import React from 'react';
import Header from './../../../../../containers/Layout/Header';
import Button from './../../../../../components/Form/Button';

const PaymentInfo2 = () => (

	<React.Fragment>
		<Header title="Receive" />
		<div className="dashboard receive-page payment-info-page">
			<div className="transaction-information__title">Estimated fee</div>
			<div className="transaction-information__value mt-3">0.0015<span className="postfix">ETH</span></div>

			<div className="dashboard-controls">
				<Button className="is-wide">Send transaction to get QR</Button>
			</div>
		</div>
	</React.Fragment>
);

export default PaymentInfo2;
