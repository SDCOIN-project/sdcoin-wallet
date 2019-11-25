import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';
import CreatePinCode from '../../../../../components/PinCode/CreatePinCode';

import accountActions from '../../../../../actions/AccountActions';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';

const ChangePassword = ({
	history, createWallet,
}) => {
	const [step, setStep] = useState(1);
	const [oldPassword, setOldPassword] = useState(null);

	const submitOldPassword = (pinCode) => {
		setOldPassword(pinCode);
		setStep(2);
	};

	const createNewPinCode = (pinCode) => {
		try {
			createWallet(pinCode, accountActions.getDecryptedMnemonic(oldPassword));
			history.push(SETTINGS_PATH);
			alert('PIN has been changed successfully');
		} catch (error) {
			alert(error.message);
		}
	};

	switch (step) {
		case 2:
			return (
				<CreatePinCode
					onSubmit={(pinCode) => createNewPinCode(pinCode)}
					onBack={() => setStep(1)}
				/>
			);
		default:
			return (
				<ValidatePinCode
					title="Enter old PIN"
					validate={(pinCode) => accountActions.validatePinCode(pinCode)}
					onSubmit={(pinCode) => submitOldPassword(pinCode)}
					onBack={() => history.push(SETTINGS_PATH)}
				/>
			);
	}
};

ChangePassword.propTypes = {
	history: PropTypes.object,
	createWallet: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
	history: {},
};

export default connect(
	() => ({}),
	(dispatch) => ({
		createWallet: (pinCode, mnemonic) => dispatch(accountActions.createWallet(pinCode, mnemonic)),
	}),
)(ChangePassword);
