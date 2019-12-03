import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';
import touchIdActions from '../../../../../actions/TouchIdActions';
import notificationActions from '../../../../../actions/NotificationActions';
import history from '../../../../../history';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';
import { ICONS } from '../../../../../constants/NotificationConstants';

const CreateTouchIdPinCode = ({
	validate, savePassword, showNotification, hasFaceId, ...props
}) => {

	const activateAltId = async (pinCode) => {
		await savePassword(pinCode);
		history.push(SETTINGS_PATH);
		showNotification({ text: `${hasFaceId ? 'Face ID' : 'Touch ID'} has been activated`, button: 'OK', icon: ICONS.lock });
	};

	return (
		<div className="wrapper-transaction">
			<ValidatePinCode
				title="Confirm PIN"
				validate={(pinCode) => validate(pinCode)}
				onSubmit={(pinCode) => activateAltId(pinCode)}
				{...props}
			/>
		</div>
	);
};

CreateTouchIdPinCode.propTypes = {
	validate: PropTypes.func.isRequired,
	hasFaceId: PropTypes.bool.isRequired,
	savePassword: PropTypes.func.isRequired,
	showNotification: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		hasFaceId: state.global.get('hasFaceId'),
	}),
	(dispatch) => ({
		savePassword: (password) => dispatch(touchIdActions.save(password)),
		showNotification: (currency) => dispatch(notificationActions.add(currency)),
	}),
)(CreateTouchIdPinCode);
