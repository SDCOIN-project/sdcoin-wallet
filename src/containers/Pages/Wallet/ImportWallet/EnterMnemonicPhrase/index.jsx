import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import history from '../../../../../history';

import Header from '../../../../Layout/Header';
import Button from '../../../../../components/Form/Button';

import walletService from '../../../../../services/WalletService';

import { WALLET_PATH } from '../../../../../constants/RouterConstants';

const ImportWallet = ({ onNext }) => {

	const validationSchema = Yup.object().shape({
		mnemonic: Yup.string()
			.test(
				'isValidMnemonic', 'Incorrect BrainKey',
				(mnemonic) => {
					if (!mnemonic) {
						return false;
					}

					const formattedMnemonic = mnemonic.trim().toLowerCase();
					if (!walletService.isValidMnemonic(formattedMnemonic)) {
						return false;
					}

					return true;
				},
			),
	});

	const initialValues = () => ({
		mnemonic: '',
	});

	const onSubmit = (values) => {
		onNext({ phrase: values.mnemonic.trim().toLowerCase() });
	};

	return (
		<div className="dashboard-container">
			<Header backButton={() => history.push(WALLET_PATH)} title="Import wallet" />
			<div className="dashboard wallet-page import-wallet-page">
				<div className="wallet-page__text">Please insert your BrainKey to continue</div>
				<Formik
					initialValues={initialValues()}
					onSubmit={(values) => onSubmit(values)}
					validationSchema={validationSchema}
					validateOnChange={false}
				>
					{({
						values, errors, handleChange, handleSubmit, setFieldError,
					}) => (
						<form onSubmit={handleSubmit} className="import-wallet-page-form">
							<div className="brain-key">
								<textarea
									id="mnemonic"
									className={`brain-key__item is-textarea ${errors.mnemonic && 'is-error'}`}
									placeholder="BrainKey…"
									onChange={(e) => {
										handleChange(e);
										setFieldError('mnemonic', '');
									}}
									value={values.mnemonic}
								/>
								{errors.mnemonic && (
									<p className="textarea__text-error">{errors.mnemonic}</p>
								)}
							</div>
							<div className="dashboard-controls">
								<Button type="submit" className="is-large">Continue</Button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

ImportWallet.propTypes = {
	onNext: PropTypes.func,
};

ImportWallet.defaultProps = {
	onNext: () => {},
};

export default ImportWallet;
