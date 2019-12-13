import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BN from 'bignumber.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import history from '../../../../history';

import Header from './../../../Layout/Header';
import Input from './../../../../components/Form/Input';
import Button from './../../../../components/Form/Button';
import TransactionBuilder from '../../../../components/TransactionBuilder';

import web3Service from './../../../../services/Web3Service';
import ethService from '../../../../services/EthService';
import swapService from '../../../../services/contracts/SwapService';
import { formatPrecision } from '../../../../helpers/FunctionHelper';
import { calculateRemainMoney, exchangeSdcOrLuv } from '../../../../helpers/TransactionHelper';

import swapTransactionActions from '../../../../actions/ExchangeTransactionActions';
import { PLUS_PERCENT_FEE } from '../../../../constants/TransactionConstants';
import { DASHBOARD_PATH } from '../../../../constants/RouterConstants';
import { SDC, LUV, ETH, LUV_EXCHANGE_RATE } from '../../../../constants/CurrencyConstants';

const initialValues = () => ({
	sdc: '',
	luv: '',
});

const ExchangeFunds = ({
	sdcBalance, ethBalance, swapSdcToLuv, exchangeEstimateGas,
}) => {

	const [sdcExchangeRate, setSdcExchangeRate] = useState(0);
	const [approveGas, setApproveGas] = useState(0);
	const [swapGas, setSwapGas] = useState(0);
	const [gasPrice, setGasPrice] = useState(0);

	const updateGas = (value) => {
		exchangeEstimateGas(web3Service.toWei(value, 'ether').toString(10)).then(({ approve, swap }) => {
			setApproveGas(approve * PLUS_PERCENT_FEE);
			setSwapGas(swap * PLUS_PERCENT_FEE);
		});
	};

	useEffect(() => {
		ethService.getGasPrice().then((data) => setGasPrice(data));
		updateGas('1');
	}, []);

	useEffect(() => {
		swapService.getSdcExchangeRate().then((data) => setSdcExchangeRate(parseInt(data, 10)));
	}, []);

	const availableSdc = formatPrecision(web3Service.fromWei(sdcBalance, 'ether').toString(10));
	const fee = new BN(approveGas + swapGas).times(gasPrice).toString(10);

	const exchangeCurrency = (from, amount) => {
		if (!amount || Number.isNaN(+amount)) {
			return '';
		}

		return exchangeSdcOrLuv(from, amount, sdcExchangeRate, LUV_EXCHANGE_RATE);
	};

	const getConfirmationOptions = (values) => {
		const { sdc } = values;
		return {
			title: `Are you sure to swap ${sdc} ${SDC}?`,
			description: `You will remain ${calculateRemainMoney(sdcBalance, sdc)} ${SDC} and ${calculateRemainMoney(ethBalance, 0, fee)} ${ETH} after transaction`,
		};
	};

	const onSubmit = async ({ sdc, ...values }) => {
		const value = web3Service.toWei(sdc).toString(10);

		return swapSdcToLuv({
			...values, value, approveGas, swapGas, gasPrice,
		});
	};

	const validationSchema = () => Yup.object().shape({
		sdc: Yup.number()
			.typeError('Invalid amount')
			.positive('Must be a positive number')
			.max(availableSdc, 'More than available')
			.required('SDC is required')
			.test(
				'checkFee',
				`Does not have enough ${ETH} to pay fee`,
				() => !new BN(fee).isGreaterThan(ethBalance),
			)
			.test(
				'checkPrecision',
				'Max precision exceeded',
				(value) => !(new BN(value).decimalPlaces() > 12),
			),
		luv: Yup.number()
			.typeError('Invalid amount')
			.positive('Must be a positive number')
			.required('LUV is required')
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
					<Header title="Exchange funds" backButton={() => history.push(DASHBOARD_PATH)} />
					<TransitionGroup>
						<CSSTransition
							in
							appear
							timeout={500}
							classNames="dashboard-transition"
						>
							<div className="dashboard exchange-funds-page">
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
												<p className="dashboard-form__row-text">Available balance:</p>
												<p className="dashboard-form__row-value">
													{availableSdc}
													<span className="dashboard-form__row-postfix">SDC</span>
												</p>
											</div>
											<div className="dashboard-form__row">
												<div className="dashboard-form__row-container">
													<i className="is-icon sdc-coin-bg-blue-icon" />
													<div className="postfix">SDC</div>
												</div>
												<Input
													placeholder="0.00"
													name="sdc"
													onChange={(e) => {
														handleChange(e);
														setFieldValue('luv', exchangeCurrency(SDC, e.target.value));
														setFieldError('sdc', '');
													}}
													value={values.sdc}
													error={errors.sdc}
												/>
											</div>
											<div className="dashboard-form__row">
												<div className="dashboard-form__row-container">
													<i className="is-icon luv-coin-bg-blue-icon" />
													<div className="postfix">LUV</div>
												</div>
												<Input
													placeholder="0.00"
													name="luv"
													onChange={(e) => {
														handleChange(e);
														setFieldValue('sdc', exchangeCurrency(LUV, e.target.value));
														setFieldError('luv', '');
													}}
													value={values.luv}
													error={errors.luv}
												/>
											</div>
											<div className="dashboard-form__row mt30">
												<p className="dashboard-form__row-text">Estimated fee:</p>
												<p className="dashboard-form__row-value">
													{web3Service.fromWeiToEther(fee)}<span className="dashboard-form__row-postfix">{ETH}</span>
												</p>
											</div>
											<div className="dashboard-controls flex-columns">
												<Button type="submit" className="is-large">Swap</Button>
											</div>
										</form>
									)}
								</Formik>
							</div>
						</CSSTransition>
					</TransitionGroup>
				</React.Fragment>
			)}
		</TransactionBuilder>
	);
};

ExchangeFunds.propTypes = {
	sdcBalance: PropTypes.string.isRequired,
	ethBalance: PropTypes.string.isRequired,
	swapSdcToLuv: PropTypes.func.isRequired,
	exchangeEstimateGas: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		sdcBalance: state.account.getIn(['balances', 'SDC']),
		ethBalance: state.account.getIn(['balances', 'ETH']),
	}),
	(dispatch) => ({
		swapSdcToLuv: (currency) => dispatch(swapTransactionActions.sdcToLuv(currency)),
		exchangeEstimateGas: (value) => dispatch(swapTransactionActions.exchangeEstimateGas(value)),
	}),
)(ExchangeFunds);
