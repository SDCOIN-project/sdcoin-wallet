import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import qs from 'query-string';
import classNames from 'classnames';
import Input from './../../../../components/Form/Input';
import SelectCurrency from './../../../../components/Form/SelectCurrency';
import Header from './../../../../containers/Layout/Header';
import Option from '../../../../components/Form/SelectCurrency/Option';
import { CURRENCIES, DEFAULT_CURRENCY, LUV } from '../../../../constants/CurrencyConstants';
import web3Service from '../../../../services/Web3Service';
import QRCodeService from '../../../../services/QRCodeService';
import clipboardService from '../../../../services/ClipboardService';

const initialValues = () => ({
	currency: DEFAULT_CURRENCY,
});

const Receive = ({ balances, address }) => {
	const [qrCode, setQrCode] = useState('data:image/png;base64,');
	const [active, setActive] = useState(false);
	let timeout = null;

	const getCurrencyOptions = () => CURRENCIES.map((currency) => ({
		text: currency,
		value: currency,
		content: <Option currency={currency} balance={balances[currency]} />,
	}));

	const validationSchema = () => Yup.object().shape({
		currency: Yup.mixed(CURRENCIES)
			.required('Currency is required'),
		amount: Yup.number()
			.typeError('Invalid amount')
			.positive('Amount must be a positive number'),
	});

	const changeQRCode = ({ amount, currency }) => {
		const result = {};
		if (currency) {
			result.currency = currency;
		}
		if (amount) {
			result.value = amount;
		}

		QRCodeService.encode(`ethereum:${address}?${qs.stringify(result)}`).then((data) => setQrCode(data));
	};

	useEffect(() => {
		changeQRCode(initialValues());
	}, []);

	return (
		<React.Fragment>
			<Header title="Receive" />
			<div className="dashboard receive-page">
				<Formik
					initialValues={initialValues()}
					onSubmit={() => {}}
					validationSchema={() => validationSchema()}
				>
					{({
						values, errors, handleChange, handleSubmit, setFieldValue, setFieldError,
					}) => (
						<form onSubmit={handleSubmit} className="dashboard-form">
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
										changeQRCode({ ...values, currency: data.value });
									}}
									label={`${values.currency} Balance`}
									error={errors.currency}
								/>
							</div>
							<div className="dashboard-form__row">
								<Input
									label="Amount"
									name="amount"
									// type="number"
									onChange={(e) => {
										handleChange(e);
										setFieldError('amount', '');
										changeQRCode({ ...values, amount: e.target.value });
									}}
									value={values.amount}
									error={errors.amount}
								/>
							</div>
							<div className={classNames('scan-qr-code-block', { 'is-small': values.currency && values.currency === LUV })}>
								{qrCode ? <img className="img-placeholder" src={qrCode} alt="Placeholder qr code" /> : null}
							</div>
							<button type="submit" className="receive-page__text-signature">Share QR code</button>
							{values.currency && values.currency === LUV && (
								<React.Fragment>
									<p className="receive-page__text-prefix">or</p>
									<a href="#" className="receive-page__text-signature">Generate payment QR code</a>
								</React.Fragment>
							)}
						</form>
					)}
				</Formik>
				<div className="dashboard-form__row transaction-information">
					<MediaQuery minWidth={375}>
						<p className="transaction-information__title">Address</p>
					</MediaQuery>
					<div className="transaction-information__container">
						<p className="transaction-information__text">{address}</p>
						<button
							className={classNames('copy-icon-container ', { 'is-active': active })}
							onClick={() => {
								clearTimeout(timeout);
								clipboardService.copy(address);
								setActive(true);
								timeout = setTimeout(() => setActive(false), 500);
							}}
						>
							<span className="text-block">Copied</span>
							<i className="is-icon copy-icon" />
						</button>
					</div>

				</div>
			</div>
		</React.Fragment>
	);
};

Receive.propTypes = {
	address: PropTypes.string.isRequired,
	balances: PropTypes.object.isRequired,
};

export default connect(
	(state) => ({
		address: state.account.get('address'),
		balances: state.account.get('balances').toJSON(),
	}),
	() => ({}),
)(Receive);
