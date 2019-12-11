import React, { useState } from 'react';
import PropTypes from 'prop-types';

import EnterPinCode from '../EnterPinCode';
import ValidatePinCode from '../ValidatePinCode';

const CreatePinCode = ({ onSubmit, onBack }) => {

	const [step, setStep] = useState(1);
	const [newPinCode, setNewPinCode] = useState(null);

	switch (step) {
		case 2:
			return (
				<ValidatePinCode
					title="Confirm PIN"
					useAltId={false}
					validate={(pinCode) => newPinCode === pinCode}
					onSubmit={async () => onSubmit(newPinCode)}
					onBack={() => onBack()}
				/>
			);
		default:
			return (
				<EnterPinCode
					title="Create PIN"
					onSubmit={(pinCode) => {
						setNewPinCode(pinCode);
						setStep(2);
					}}
					onBack={() => onBack()}
				/>
			);
	}
};

CreatePinCode.propTypes = {
	onBack: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default CreatePinCode;
