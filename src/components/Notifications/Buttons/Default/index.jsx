import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import notificationActions from '../../../../actions/NotificationActions';
import Button from '../../../Form/Button';

const DefaultButton = ({
	id, buttonText, buttonCallback, deleteNotification,
}) => (
	<Button
		onClick={(e) => { e.preventDefault(); buttonCallback(); deleteNotification(id); }}
		className="notification-button is-notification-button-small"
	>
		{buttonText}
	</Button>
);

DefaultButton.propTypes = {
	id: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	buttonCallback: PropTypes.func.isRequired,
	deleteNotification: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		deleteNotification: (id) => dispatch(notificationActions.delete(id)),
	}),
)(DefaultButton);
