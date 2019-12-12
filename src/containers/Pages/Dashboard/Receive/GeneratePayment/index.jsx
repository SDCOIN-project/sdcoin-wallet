import React, { useState } from 'react';
import { Formik } from 'formik';
import BN from 'bignumber.js';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './../../../../Layout/Header';
import Button from './../../../../../components/Form/Button';
import Input from './../../../../../components/Form/Input';
import { ETH } from '../../../../../constants/CurrencyConstants';
import web3Service from '../../../../../services/Web3Service';
import { PLUS_PERCENT_FEE } from '../../../../../constants/TransactionConstants';
import ethService from '../../../../../services/EthService';
import escrowActions from '../../../../../actions/EscrowActions';
import { DASHBOARD_PATH, RECEIVE_PATH } from '../../../../../constants/RouterConstants';
import TransactionBuilder from '../../../../../components/TransactionBuilder';
import history from '../../../../../history';
import { ETH_AMOUNT_TO_ESCROW_CREATE } from '../../../../../constants/GlobalConstants';
import { calculateRemainMoney } from '../../../../../helpers/TransactionHelper';

const initialValues = () => ({
	price: '',
});

const GeneratePayment = ({ balances, createEscrowEstimateGas, createEscrowContract }) => {

	const [gas, setGas] = useState(0);
	const [gasPrice, setGasPrice] = useState(0);

	const fee = new BN(gas).times(gasPrice).toString(10);

	const updateFee = async (price) => {
		const newGasPrice = await ethService.getGasPrice();
		setGasPrice(newGasPrice);
		const estimatedGas = await createEscrowEstimateGas(price);
		setGas(new BN(estimatedGas).plus(new BN(estimatedGas).dividedToIntegerBy(PLUS_PERCENT_FEE)).toString(10));
	};

	const validationSchema = () => Yup.object().shape({
		price: Yup.number()
			.typeError('Invalid price')
			.required('Amount is required')
			.positive('Amount must be a positive number')
			.test(
				`check ${ETH} balance`, `Amount exceeds ${ETH} balance`,
				(value) => {
					if (!value || value < 0) return false;
					const balance = balances[ETH];
					const neededAmount = web3Service.toWei(ETH_AMOUNT_TO_ESCROW_CREATE).plus(new BN(fee));
					return !neededAmount.isGreaterThan(new BN(balance));
				},
			)
			.test(
				'checkPrecision',
				'Max precision exceeded',
				(value) => !(new BN(value).decimalPlaces() > 12),
			),
	});

	return (
		<TransactionBuilder
			handleTransaction={(values) => createEscrowContract(values.price, gas, gasPrice)}
			onDone={() => history.push(DASHBOARD_PATH)}
		>
			{({ submitTransaction }) => (
				<React.Fragment>
					<Header backButton={() => history.push(RECEIVE_PATH)} className="generate-payment" title="Generate payment QR" />
					<div className="dashboard generate-payment-page">
						<Formik
							initialValues={initialValues()}
							onSubmit={(values) => submitTransaction(values, {
								title: 'Are you sure you want to generate payment QR?',
								description: `You will remain ${calculateRemainMoney(balances[ETH], 0.1, fee)} ${ETH} after generation`,
							})}
							validationSchema={() => validationSchema()}
						>
							{({
								values, errors, handleChange, handleSubmit, setFieldError,
							}) => (
								<form onSubmit={handleSubmit} className="dashboard-form with-controls">
									<div className="dashboard-form__row">
										Please define your good&apos;s price in LUV
									</div>
									<div className="dashboard-form__row">
										<Input
											label="Good's price, LUV"
											name="price"
											// type="number"
											onChange={(e) => {
												handleChange(e);
												updateFee(e.target.value);
												setFieldError('price', '');
											}}
											value={values.price}
											error={errors.price}
										/>
									</div>
									<div className="dashboard-form__row flex-start">
										{
											values.price ? (
												<p className="text is-orange">{ETH_AMOUNT_TO_ESCROW_CREATE} ETH will be sent</p>
											) : (
												<p className="text">{ETH_AMOUNT_TO_ESCROW_CREATE} ETH should be sent to compensate Buyers&apos; transactions fees</p>
											)
										}
										<p className="value">{ETH_AMOUNT_TO_ESCROW_CREATE} <span className="prefix">ETH</span></p>
									</div>
									{
										web3Service.fromWeiToEther(fee) ? (
											<div className={`dashboard-form__row mt30 ${fee}`}>
												<p className="dashboard-form__row-text">Estimated fee:</p>
												<p className="dashboard-form__row-value">{web3Service.fromWeiToEther(fee)} <span className="dashboard-form__row-postfix">{ETH}</span></p>
											</div>
										) : null
									}
									{
										values.price ? (
											<div className="dashboard-controls">
												<Button type="submit" className="is-wide">Send transaction to get QR</Button>
											</div>
										) : null
									}
								</form>
							)}
						</Formik>
					</div>
				</React.Fragment>
			)}
		</TransactionBuilder>
	);
};

GeneratePayment.propTypes = {
	balances: PropTypes.object.isRequired,
	createEscrowEstimateGas: PropTypes.func.isRequired,
	createEscrowContract: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		balances: state.account.get('balances').toJSON(),
	}),
	(dispatch) => ({
		createEscrowEstimateGas: (price) => dispatch(escrowActions.createEscrowContractEstimateGas(price)),
		createEscrowContract: (price, gas, gasPrice) => dispatch(escrowActions.createEscrowContract(price, gas, gasPrice)),
	}),
)(GeneratePayment);
