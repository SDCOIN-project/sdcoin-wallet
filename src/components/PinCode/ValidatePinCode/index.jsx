import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EnterPinCode from '../EnterPinCode';


const ValidatePinCode = ({ validate, onSubmit, ...props }) => {
	const [invalidPinCode, setInvalidPinCode] = useState(false);

	const checkValidPinCode = (pinCode) => {
		if (!validate(pinCode)) {
			setInvalidPinCode(true);
			setTimeout(() => {
				setInvalidPinCode(false);
			}, 500);
		} else {
			onSubmit(pinCode);
		}
	};

	return (
		<div className="wrapper-transaction">
			<EnterPinCode
				invalidPinCode={invalidPinCode}
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
