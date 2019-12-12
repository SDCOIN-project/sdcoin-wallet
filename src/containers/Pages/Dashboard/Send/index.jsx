import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ethUtil from 'ethereumjs-util';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BN from 'bignumber.js';

import history from '../../../../history';
import Button from './../../../../components/Form/Button';
import Input from './../../../../components/Form/Input';
import SelectCurrency from './../../../../components/Form/SelectCurrency';
import Option from './../../../../components/Form/SelectCurrency/Option';
import Header from './../../../../containers/Layout/Header';
import TransactionBuilder from '../../../../components/TransactionBuilder';

import web3Service from '../../../../services/Web3Service';
import ethService from '../../../../services/EthService';
import { calculateRemainMoney } from '../../../../helpers/TransactionHelper';
import { CURRENCIES, ETH, DEFAULT_CURRENCY } from '../../../../constants/CurrencyConstants';
import { PLUS_PERCENT_FEE } from '../../../../constants/TransactionConstants';
import { DASHBOARD_PATH, PAY_TO_ESCROW } from '../../../../constants/RouterConstants';

import sendTransactionActions from '../../../../actions/SendTransactionActions';
import scanQrCodeActions from '../../../../actions/ScanQrCodeActions';
import notificationActions from '../../../../actions/NotificationActions';

const initialValues = () => ({
	currency: DEFAULT_CURRENCY,
	address: '',
	amount: '',
});

const Send = ({
	balances, transferSend, transferEstimateGas, scanQrCode, showErrorNotification,
}) => {

	const [gas, setGas] = useState(0);
	const [gasPrice, setGasPrice] = useState(0);

	const fee = new BN(gas).times(gasPrice).toString(10);

	const updateGas = (currency) => {
		transferEstimateGas(currency).then((data) => setGas(data * PLUS_PERCENT_FEE));
	};

	useEffect(() => {
		ethService.getGasPrice().then((data) => setGasPrice(data));
		updateGas(DEFAULT_CURRENCY);
	}, []);

	const onSubmit = async ({ amount, ...values }) => {
		amount = web3Service.toWei(amount).toString(10);

		return transferSend({
			...values, amount, gas, gasPrice,
		});
	};

	const onScanQrCode = (e, setFieldValue) => {
		e.preventDefault();
		scanQrCode({
			description: 'Scan QR code to get recipient address',
			onScan: (qrCodeData) => {
				const data = web3Service.parseUrl(qrCodeData);
				if (!data.address) {
					showErrorNotification({ text: 'Address in QR Code is not found', button: 'OK' });
				} else {
					setFieldValue('address', data.address);
					if (data.value) {
						setFieldValue('amount', data.value);
					}
					if (data.token) {
						setFieldValue('currency', data.token);
						updateGas(data.token);
					}
				}
			},
		});
	};

	const getCurrencyOptions = () => CURRENCIES.map((currency) => ({
		text: currency,
		value: currency,
		content: <Option currency={currency} balance={balances[currency]} />,
	}));

	const getConfirmationOptions = (values) => {
		const { amount, currency } = values;
		return {
			title: `Are you sure to send ${amount} ${currency}?`,
			description: `You will remain ${calculateRemainMoney(balances[currency], amount, currency === ETH ? fee : 0)} ${currency} after transaction`,
		};
	};

	const validationSchema = () => Yup.object().shape({
		currency: Yup.mixed(CURRENCIES)
			.required('Currency is required'),
		address: Yup.string()
			.required('Address is required')
			.test(
				'isValidAddress', 'Address is not valid',
				(value) => value && ethUtil.isValidAddress(value),
			),
		amount: Yup.number()
			.typeError('Invalid amount')
			.required('Amount is required')
			.positive('Amount must be a positive number')
			.when('currency', (currency, schema) => schema.test(
				'checkBalance', `Amount exceeds ${currency} balance`,
				(value) => {
					if (!value || value < 0) return false;
					const balance = balances[currency];
					const neededAmount = web3Service.toWei(value).plus(new BN(currency === ETH ? fee : 0));
					return !neededAmount.isGreaterThan(new BN(balance));
				},
			))
			.when('currency', (currency, schema) => schema.test(
				'checkFee', `${ETH} does not have enough funds to pay fee`,
				() => !(currency !== ETH && new BN(fee).isGreaterThan(balances[ETH])),
			))
			.test(
				'checkPrecision',
				'Max precision exceeded',
				(value) => !(new BN(value).decimalPlaces() > 12),
			),
	});

	return (
		<TransactionBuilder
			handleTransaction={(values) => onSubmit(values)}
			onDone={() => history.push(DASHBOARD_PATH)}
		>
			{({ submitTransaction }) => (
				<React.Fragment>
					<Header title="Send" />
					<div className="dashboard send-page">
						<Formik
							initialValues={initialValues()}
							onSubmit={(values) => submitTransaction(values, getConfirmationOptions(values))}
							validationSchema={() => validationSchema()}
							validateOnChange={false}
						>
							{({
								values, errors, handleChange, handleSubmit, setFieldValue, setFieldError,
							}) => (
								<form onSubmit={handleSubmit} className="dashboard-form with-controls">
									<div className="dashboard-form__row">
										<div className="dashboard-form__row-title">Select token:</div>
										<SelectCurrency
											selection
											value={values.currency}
											amount={web3Service.fromWeiToEther(balances[values.currency])}
											name="currency"
											options={getCurrencyOptions()}
											onChange={(event, data) => {
												setFieldValue('currency', data.value);
												updateGas(data.value);
											}}
											label={`${values.currency} Balance`}
											error={errors.currency}
										/>
									</div>
									<div className="dashboard-form__row">
										<Input
											label="Address"
											name="address"
											onChange={(e) => {
												handleChange(e);
												setFieldError('address', '');
											}}
											value={values.address}
											error={errors.address}
										/>
										<a href="#" onClick={(e) => onScanQrCode(e, setFieldValue)} className="qr-code-small-container">
											<i className="is-icon qr-code-small-blue-icon" />
										</a>
									</div>
									<div className="dashboard-form__row">
										<Input
											label="Amount"
											name="amount"
											// type="number"
											onChange={(e) => {
												handleChange(e);
												setFieldError('amount', '');
											}}
											value={values.amount}
											error={errors.amount}
										/>
									</div>
									<div className="dashboard-form__row mt10">
										<p className="dashboard-form__row-text">Estimated fee:</p>
										<p className="dashboard-form__row-value">
											{web3Service.fromWeiToEther(fee)} <span className="dashboard-form__row-postfix">{ETH}</span>
										</p>
									</div>
									<div className="dashboard-controls flex-columns">
										<a
											href="#"
											className="text"
											onClick={(e) => {
												e.preventDefault();
												history.push(PAY_TO_ESCROW);
											}}
										>
											Pay with Payment QR
										</a>
										<Button type="submit" className="is-large">Send</Button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</React.Fragment>
			)}
		</TransactionBuilder>
	);

};

Send.propTypes = {
	balances: PropTypes.object.isRequired,
	transferSend: PropTypes.func.isRequired,
	transferEstimateGas: PropTypes.func.isRequired,
	scanQrCode: PropTypes.func.isRequired,
	showErrorNotification: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		address: state.account.get('address'),
		balances: state.account.get('balances').toJSON(),
	}),
	(dispatch) => ({
		transferEstimateGas: (currency) => dispatch(sendTransactionActions.transferEstimateGas(currency)),
		transferSend: (values) => dispatch(sendTransactionActions.transferSend(values)),
		scanQrCode: (params) => dispatch(scanQrCodeActions.scan(params)),
		showErrorNotification: (currency) => dispatch(notificationActions.errorNotification(currency)),
	}),
)(Send);
