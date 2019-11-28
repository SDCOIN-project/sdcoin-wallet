import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';
import CreatePinCode from '../../../../../components/PinCode/CreatePinCode';

import accountActions from '../../../../../actions/AccountActions';
import notificationActions from '../../../../../actions/NotificationActions';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';
import { ICONS } from '../../../../../constants/NotificationConstants';

const ChangePassword = ({
	history, createWallet, showNotification, showErrorNotification,
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
			showNotification({ text: 'PIN has been changed successfully', button: 'OK', icon: ICONS.lock });
		} catch (error) {
			showErrorNotification({ text: error.message });
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
	showNotification: PropTypes.func.isRequired,
	showErrorNotification: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
	history: {},
};

export default connect(
	() => ({}),
	(dispatch) => ({
		createWallet: (pinCode, mnemonic) => dispatch(accountActions.createWallet(pinCode, mnemonic)),
		showNotification: (currency) => dispatch(notificationActions.add(currency)),
		showErrorNotification: (currency) => dispatch(notificationActions.errorNotification(currency)),
	}),
)(ChangePassword);
