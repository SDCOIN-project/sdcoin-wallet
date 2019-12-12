import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';
import CreatePinCode from '../../../../../components/PinCode/CreatePinCode';

import accountActions from '../../../../../actions/AccountActions';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';

const ChangePassword = ({
	history, changePin,
}) => {
	const [step, setStep] = useState(1);
	const [oldPassword, setOldPassword] = useState(null);

	const submitOldPassword = (pinCode) => {
		setOldPassword(pinCode);
		setStep(2);
	};

	const createNewPinCode = async (pinCode) => {
		await changePin(oldPassword, pinCode);
		history.push(SETTINGS_PATH);
	};

	switch (step) {
		case 2:
			return (
				<CreatePinCode
					onSubmit={async (pinCode) => { await createNewPinCode(pinCode); }}
					onBack={() => history.push(SETTINGS_PATH)}
					isCreateWallet={false}
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
	changePin: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
	history: {},
};

export default connect(
	(state) => ({
		alternativeIdEnabled: state.global.get('alternativeIdEnabled'),
	}),
	(dispatch) => ({
		changePin: (oldPin, newPin) => dispatch(accountActions.changePin(oldPin, newPin)),
	}),
)(ChangePassword);
