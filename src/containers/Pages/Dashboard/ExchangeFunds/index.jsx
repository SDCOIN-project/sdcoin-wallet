import React from 'react';
import Header from './../../../Layout/Header';
import Input from './../../../../components/Form/Input';


const ExchangeFunds = () => (
	<React.Fragment>
		<Header title="Exchange funds" />
		<div className="dashboard exchange-funds-page">
			<form className="dashboard-form">
				<div className="dashboard-form__row">
					<p className="dashboard-form__row-text">Available balance:</p>
					<p className="dashboard-form__row-value">530.0025<span className="dashboard-form__row-postfix">SDC</span></p>
				</div>
				<div className="dashboard-form__row">
					<div className="dashboard-form__row-container">
						<i className="is-icon sdc-coin-bg-blue-icon" />
						<div className="postfix">SDC</div>
					</div>
					<Input
						placeholder="0"
					/>
				</div>
				<div className="dashboard-form__row">
					<div className="dashboard-form__row-container">
						<i className="is-icon luv-coin-bg-blue-icon" />
						<div className="postfix">LUV</div>
					</div>
					<Input
						placeholder="0"
					/>
				</div>

				<div className="dashboard-form__row mt30">
					<p className="dashboard-form__row-text">Estimated fee:</p>
					<p className="dashboard-form__row-value">0<span className="dashboard-form__row-postfix">SDC</span></p>
				</div>
			</form>
		</div>
	</React.Fragment>
);

export default ExchangeFunds;
