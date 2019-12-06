import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EnterPinCode from '../EnterPinCode';
import touchIdService from '../../../services/TouchIdService';
import { PASSWORD, FINGER_PRINT_TYPE } from '../../../constants/GlobalConstants';

const ValidatePinCode = ({
	validate, onSubmit, useAltId, title, ...props
}) => {

	const [invalidPinCode, setInvalidPinCode] = useState(false);
	const [availableType, setAvailableType] = useState('');
	const [hasPassword, setHasPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [changedTitle, setTitle] = useState(title);

	useEffect(() => {
		const func = async () => {
			const isAvailable = await touchIdService.getAvailableType();
			setAvailableType(isAvailable);
			if (isAvailable) {
				const hasPass = await touchIdService.has(PASSWORD);
				setHasPassword(hasPass);
			}
		};
		func();
	}, []);

	const validatePin = (pinCode) => {
		if (!validate(pinCode)) {
			setInvalidPinCode(true);
			title = setTitle('Incorrect PIN. Try again');
			setTimeout(() => {
				setInvalidPinCode(false);
			}, 500);
			setLoading(false);
		} else {
			setLoading(false);
			onSubmit(pinCode);
		}
	};

	const checkValidPinCode = async (pinCode) => {
		setLoading(true);
		// use timeout to prevent process blocking
		setTimeout(() => validatePin(pinCode), 300);
	};

	useEffect(() => {
		const func = async () => {
			const password = await touchIdService.verify(PASSWORD, availableType === FINGER_PRINT_TYPE.FACE ? 'Enter your FaceId' : 'Enter your TouchId');
			checkValidPinCode(password);
		};
		if (availableType && hasPassword && useAltId) {
			func();
		}
	}, [availableType, hasPassword]);

	return (
		<div className="show-top-all">
			<EnterPinCode
				invalidPinCode={invalidPinCode}
				loading={loading}
				onSubmit={(pinCode) => checkValidPinCode(pinCode)}
				title={changedTitle}
				{...props}
			/>
		</div>
	);

};

ValidatePinCode.defaultProps = {
	useAltId: true,
};

ValidatePinCode.propTypes = {
	validate: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	useAltId: PropTypes.bool,
	title: PropTypes.string.isRequired,
};

export default ValidatePinCode;
