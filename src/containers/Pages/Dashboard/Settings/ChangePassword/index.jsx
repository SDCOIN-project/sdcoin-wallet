import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';
import CreatePinCode from '../../../../../components/PinCode/CreatePinCode';

import accountActions from '../../../../../actions/AccountActions';
import notificationActions from '../../../../../actions/NotificationActions';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';
import { ICONS } from '../../../../../constants/NotificationConstants';
import touchIdActions from '../../../../../actions/TouchIdActions';

const ChangePassword = ({
	history, createWallet, savePassword, showNotification, alternativeIdEnabled, showErrorNotification,
}) => {
	const [step, setStep] = useState(1);
	const [oldPassword, setOldPassword] = useState(null);

	const submitOldPassword = (pinCode) => {
		setOldPassword(pinCode);
		setStep(2);
	};

	const createNewPinCode = async (pinCode) => {
		try {
			createWallet(pinCode, accountActions.getDecryptedMnemonic(oldPassword));
			if (alternativeIdEnabled) {
				await savePassword(pinCode);
			}
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
					useAltId={false}
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
	savePassword: PropTypes.func.isRequired,
	alternativeIdEnabled: PropTypes.bool.isRequired,
};

ChangePassword.defaultProps = {
	history: {},
};

export default connect(
	(state) => ({
		alternativeIdEnabled: state.global.get('alternativeIdEnabled'),
	}),
	(dispatch) => ({
		createWallet: (pinCode, mnemonic) => dispatch(accountActions.createWallet(pinCode, mnemonic)),
		showNotification: (currency) => dispatch(notificationActions.add(currency)),
		savePassword: (password) => dispatch(touchIdActions.save(password)),
		showErrorNotification: (currency) => dispatch(notificationActions.errorNotification(currency)),
	}),
)(ChangePassword);
