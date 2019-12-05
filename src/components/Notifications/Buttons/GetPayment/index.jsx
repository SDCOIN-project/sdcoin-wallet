import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import notificationActions from '../../../../actions/NotificationActions';
import Button from '../../../Form/Button';
import { GET_PAYMENT_PATH } from '../../../../constants/RouterConstants';

const GetPaymentButton = ({
	id, deleteNotification, history,
}) => (
	<Button
		onClick={(e) => {
			e.preventDefault();
			history.push(GET_PAYMENT_PATH);
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
	deleteNotification: PropTypes.func.isRequired,
	history: PropTypes.object,
};

GetPaymentButton.defaultProps = {
	history: {},
};

export default connect(
	() => ({}),
	(dispatch) => ({
		deleteNotification: (id) => dispatch(notificationActions.delete(id)),
	}),
)(withRouter(GetPaymentButton));
