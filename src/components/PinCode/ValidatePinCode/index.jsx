import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EnterPinCode from '../EnterPinCode';
import touchIdService from '../../../services/TouchIdService';
import { PASSWORD, FINGER_PRINT_TYPE } from '../../../constants/GlobalConstants';
import { SETTINGS_PATH } from '../../../constants/RouterConstants';
import history from '../../../history';
import touchIdActions from '../../../actions/TouchIdActions';

const ValidatePinCode = ({
	validate, onSubmit, useAltId, title, onBack, verifyAltId, ...props
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

	const asyncTimeout = async (t) => new Promise((r) => setTimeout(() => r(), t));

	const checkValidPinCode = async (pinCode) => {
		setLoading(true);
		await asyncTimeout(100);

		if (!validate(pinCode)) {
			setInvalidPinCode(true);
			title = setTitle('Wrong PIN. Try again');
			setLoading(false);
			await asyncTimeout(500);
			setInvalidPinCode(false);
			return;
		}
		await asyncTimeout(300);
		await onSubmit(pinCode);
		setLoading(false);
	};

	const tryTouchId = async () => {
		const password = await verifyAltId(PASSWORD, availableType === FINGER_PRINT_TYPE.FACE ? 'Enter your FaceId' : 'Enter your TouchId');
		await checkValidPinCode(password);
	};

	useEffect(() => {
		if (availableType && hasPassword && useAltId) {
			tryTouchId();
		}
	}, [availableType, hasPassword]);

	return (
		<div className="show-top-all">
			<EnterPinCode
				invalidPinCode={invalidPinCode}
				loading={loading}
				onSubmit={(pinCode) => checkValidPinCode(pinCode)}
				title={changedTitle}
				onBack={onBack}
				showAltIdButtons
				retryAltId={() => tryTouchId()}
				{...props}
			/>
		</div>
	);

};

ValidatePinCode.defaultProps = {
	useAltId: true,
	onBack: () => history.push(SETTINGS_PATH),
};

ValidatePinCode.propTypes = {
	validate: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onBack: PropTypes.func,
	verifyAltId: PropTypes.func.isRequired,
	useAltId: PropTypes.bool,
	title: PropTypes.string.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		verifyAltId: (key, message) => dispatch(touchIdActions.verify(key, message)),
	}),
)(ValidatePinCode);
