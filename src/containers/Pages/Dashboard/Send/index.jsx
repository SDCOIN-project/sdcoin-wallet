import React, { useState } from 'react';
import Button from './../../../../components/Form/Button';
import Input from './../../../../components/Form/Input';
import Select from './../../../../components/Form/Select';
import Header from './../../../../containers/Layout/Header';

const SelectDate = [
	{
		key: 'a1',
		value: '530.0025',
		text: '530.0025',
		postfix: 'CHF',
		content: (
			<div className="select-inner-item">
				<i className="is-icon sdc-coin-icon" />
				<div className="select-inner-item__information">
					<div className="select-inner-item__information-title">SDCoin</div>
					<div className="select-inner-item__information-value">530.0025 <span className="postfix">SDC</span></div>
				</div>
			</div>
		),
	},
	{
		key: 'a2',
		value: 'a2',
		text: '530.0025',
		postfix: 'CHF',
		content: (
			<div className="select-inner-item">
				<i className="is-icon eth-coin-icon" />
				<div className="select-inner-item__information">
					<div className="select-inner-item__information-title">Ethereum</div>
					<div className="select-inner-item__information-value">7 001.896 <span className="postfix">ETH</span></div>
				</div>
			</div>
		),
	},
	{
		key: 'a3',
		value: 'a3',
		text: '530.0025',
		postfix: 'CHF',
		content: (
			<div className="select-inner-item">
				<i className="is-icon luv-coin-icon" />
				<div className="select-inner-item__information">
					<div className="select-inner-item__information-title">LUV</div>
					<div className="select-inner-item__information-value">0.258746 <span className="postfix">LUV</span></div>
				</div>
			</div>
		),
	},
];


const Send = () => {

	const [address, setAddress] = useState('');

	return (
		<React.Fragment>
			<Header backButton={false} title="Send" />
			<div className="dashboard send-page">
				<form action="" className="dashboard-form">
					<div className="dashboard-form__row">
						<div className="dashboard-form__row-title">Select token:</div>
						<Select
							selection
							name="pair"
							options={SelectDate}
							value={SelectDate[0]}
							label="SDC Balance"
						/>
					</div>
					<div className="dashboard-form__row">
						<Input
							label="Address"
							onChange={(e) => setAddress(e.target.value)}
							value={address}
						/>
						<a href="#" className="qr-code-small-container">
							<i className="is-icon qr-code-small-blue-icon" />
						</a>
					</div>
					<div className="dashboard-form__row">
						<Input
							label="00"
							onChange={(e) => setAddress(e.target.value)}
							value={address}
							error="Address does not exist"
						/>
					</div>
					<div className="dashboard-form__row mt30">
						<p className="dashboard-form__row-text">Estimated fee:</p>
						<p className="dashboard-form__row-value">0.0015 <span className="dashboard-form__row-postfix">ETH </span></p>
					</div>
				</form>
				<div className="dashboard-controls flex-columns">
					<span className="text">Pay with Payment QR</span>
					<Button className="is-large">Send</Button>
				</div>
			</div>
		</React.Fragment>
	);

};

export default Send;
