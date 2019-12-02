import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EnterPinCode from '../EnterPinCode';

const ValidatePinCode = ({ validate, onSubmit, ...props }) => {

	const [invalidPinCode, setInvalidPinCode] = useState(false);
	const [loading, setLoading] = useState(false);


	const validatePin = (pinCode) => {
		if (!validate(pinCode)) {
			setInvalidPinCode(true);
			setTimeout(() => {
				setInvalidPinCode(false);
			}, 500);
			setLoading(false);
		} else {
			onSubmit(pinCode);
			setLoading(false);
		}
	};

	const checkValidPinCode = async (pinCode) => {
		setLoading(true);
		// use timeout to prevent process blocking
		setTimeout(() => validatePin(pinCode), 300);
	};

	return (
		<div className="wrapper-transaction">
			<EnterPinCode
				invalidPinCode={invalidPinCode}
				loading={loading}
				onSubmit={(pinCode) => checkValidPinCode(pinCode)}
				{...props}
			/>
		</div>
	);

};

ValidatePinCode.propTypes = {
	validate: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default ValidatePinCode;
