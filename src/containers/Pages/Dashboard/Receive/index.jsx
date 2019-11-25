import React from 'react';
import Media from 'react-media';
import Input from './../../../../components/Form/Input';
import SelectCurrency from './../../../../components/Form/SelectCurrency';
import Header from './../../../../containers/Layout/Header';
import Option from '../../../../components/Form/SelectCurrency/Option';

const SelectDate = [
	{
		text: 'ETH',
		value: 'ETH',
		content: <Option currency="ETH" balance="100000000" />,
	},
];

const Receive = () => (

	<React.Fragment>
		<Header backButton={false} title="Receive" />
		<div className="dashboard receive-page">
			<form action="" className="dashboard-form">
				<div className="dashboard-form__row">
					<div className="dashboard-form__row-title">Select token:</div>

					<SelectCurrency
						selection
						value="ETH"
						amount={100}
						options={SelectDate}
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
