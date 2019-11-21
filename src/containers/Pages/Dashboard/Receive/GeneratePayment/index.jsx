import React from 'react';
import Header from './../../../../Layout/Header';
import Button from './../../../../../components/Form/Button';
import Input from './../../../../../components/Form/Input';

const GeneratePayment = () => (
	<React.Fragment>
		<Header className="generate-payment" title="Generate payment QR" />
		<div className="dashboard generate-payment-page">
			<form action="" className="dashboard-form">
				<div className="dashboard-form__row">
					Please define your good&apos;s price in LUV
				</div>
				<div className="dashboard-form__row">
					<Input
						label="Good's price, LUV"
					/>
				</div>
				<div className="dashboard-form__row flex-start">
					<p className="text">1 ETH should be sent to compensate Buyers&apos; transactions fees</p>
					<p className="value">1 <span className="prefix">ETH</span></p>
				</div>
				<div className="dashboard-form__row mt30">
					<p className="dashboard-form__row-text">Estimated fee:</p>
					<p className="dashboard-form__row-value">0.0015<span className="dashboard-form__row-postfix">ETH</span></p>
				</div>
			</form>
			<div className="dashboard-controls">
				<Button className="is-wide">Send transaction to get QR</Button>
			</div>
		</div>
	</React.Fragment>
);

export default GeneratePayment;
