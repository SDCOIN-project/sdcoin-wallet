import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EnterPinCode from '../EnterPinCode';
import ValidatePinCode from '../ValidatePinCode';
import modalActions from '../../../actions/ModalActions';
import touchIdActions from '../../../actions/TouchIdActions';

const CreatePinCode = ({
	onSubmit, onBack, isCreateWallet, confirmAsync, savePassword, alternativeIdEnabled,
}) => {

	const [step, setStep] = useState(1);
	const [newPinCode, setNewPinCode] = useState(null);

	const submitPin = async (pinCode) => {
		if (isCreateWallet && alternativeIdEnabled) {
			const answer = await confirmAsync({
				title: 'Would you like to activate an alternative authorization method?',
				cancelButtonText: 'Later',
				confirmButtonText: 'Activate',
				description: '',
			});
			if (answer) {
				await savePassword(pinCode);
			}
		}
		onSubmit(pinCode);
	};

	switch (step) {
		case 2:
			return (
				<ValidatePinCode
					title="Confirm PIN"
					useAltId={false}
					validate={(pinCode) => newPinCode === pinCode}
					onSubmit={async () => { await submitPin(newPinCode); }}
					onBack={() => onBack()}
					showAltIdButtons={false}
				/>
			);
		default:
			return (
				<EnterPinCode
					title="Create new PIN"
					onSubmit={(pinCode) => {
						setNewPinCode(pinCode);
						setStep(2);
					}}
					onBack={() => onBack()}
					showAltIdButtons={false}
				/>
			);
	}
};

CreatePinCode.propTypes = {
	onBack: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	confirmAsync: PropTypes.func.isRequired,
	savePassword: PropTypes.func.isRequired,
	isCreateWallet: PropTypes.bool.isRequired,
	alternativeIdEnabled: PropTypes.bool.isRequired,
};

export default connect(
	(state) => ({
		alternativeIdEnabled: state.global.get('alternativeIdEnabled'),
	}),
	(dispatch) => ({
		confirmAsync: (params) => dispatch(modalActions.confirmAsync(params)),
		savePassword: (password) => dispatch(touchIdActions.save(password)),
	}),
)(CreatePinCode);
