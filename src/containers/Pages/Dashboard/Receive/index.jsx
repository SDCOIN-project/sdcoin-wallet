import React from 'react';
import Media from 'react-media';
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

const Receive = () => (

	<React.Fragment>
		<Header backButton={false} title="Receive" />
		<div className="dashboard receive-page">
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
						label="Amount"
					/>
				</div>
			</form>
			{/* to reduce the block you need to add the class "is-small" */}
			<div className="scan-qr-code-block">
				<img className="img-placeholder" src="/images/placeholder-qr-code.svg" alt="Placeholder qr code" />
			</div>
			<a href="#" className="receive-page__text-signature">Share QR code</a>
			{/* <p className="receive-page__text-prefix">or</p> */}
			{/* <a href="#" className="receive-page__text-signature">Generate payment QR code</a> */}
			<div className="dashboard-form__row transaction-information">
				<Media
					query="(min-width: 375px)"
					render={() => (
						<p className="transaction-information__title">Address</p>
					)}
				/>
				<div className="transaction-information__container">
					<p className="transaction-information__text">0xea674fdde714fd979de3edf0f56aa9716b898ec8</p>
					{/* to play animation add - "is-active" */}
					<button className="copy-icon-container">
						<span className="text-block">Copied</span>
						<i className="is-icon copy-icon" />
					</button>
				</div>

			</div>
		</div>
	</React.Fragment>
);

export default Receive;
