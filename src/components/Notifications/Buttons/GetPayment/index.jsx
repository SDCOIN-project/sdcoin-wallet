import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import notificationActions from '../../../../actions/NotificationActions';
import Button from '../../../Form/Button';

const GetPaymentButton = ({
	id, buttonCallback, deleteNotification,
}) => (
	<Button
		onClick={(e) => {
			e.preventDefault();
			buttonCallback();
			deleteNotification(id);
		}}
		className="qr-code-button"
	>
		<i className="is-icon qr-code-small-white-icon" />
		<span>Get Payment</span>
	</Button>
);

GetPaymentButton.propTypes = {
	id: PropTypes.string.isRequired,
	buttonCallback: PropTypes.func.isRequired,
	deleteNotification: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		deleteNotification: (id) => dispatch(notificationActions.delete(id)),
	}),
)(GetPaymentButton);
