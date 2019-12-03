import React from 'react';
import Header from './../../../../Layout/Header';
import Button from './../../../../../components/Form/Button';


const PaymentDetails = () => (
	<React.Fragment>
		<Header title="Payment details" backButton={false} />
		<div className="dashboard payment-details-page">
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Currency</div>
				<div className="dashboard-stripe__text">SDC</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Address</div>
				<div className="dashboard-stripe__text">0x542cc7300EbE9ba4Bb5C8E646C82cfE83f995014</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Amount to pay</div>
				<div className="dashboard-stripe__text">100</div>
			</div>
			<div className="dashboard-stripe__text last-child">Fee will be paid by Retailer</div>
			<div className="dashboard-controls">
				<Button className="is-large">Send</Button>
			</div>
		</div>
	</React.Fragment>
);


export default PaymentDetails;
