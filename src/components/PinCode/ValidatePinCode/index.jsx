import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EnterPinCode from '../EnterPinCode';
import touchIdService from '../../../services/TouchIdService';
import { PASSWORD, FINGER_PRINT_TYPE } from '../../../constants/GlobalConstants';
import { SETTINGS_PATH } from '../../../constants/RouterConstants';
import history from '../../../history';


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

	const checkValidPinCode = async (pinCode) => {
		setLoading(true);
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				if (!validate(pinCode)) {
					setInvalidPinCode(true);
					title = setTitle('Wrong PIN. Try again');
					setTimeout(() => {
						setInvalidPinCode(false);
					}, 500);
					setLoading(false);
					reject(new Error('Wrong PIN. Try again'));
				} else {
					await onSubmit(pinCode);
					setLoading(false);
					resolve();
				}
			}, 100);
		});
	};

	useEffect(() => {
		const func = async () => {
			const password = await touchIdService.verify(PASSWORD, availableType === FINGER_PRINT_TYPE.FACE ? 'Enter your FaceId' : 'Enter your TouchId');
			await checkValidPinCode(password);
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
				onBack={() => history.push(SETTINGS_PATH)}
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
