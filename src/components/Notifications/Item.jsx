import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import notificationActions from '../../actions/NotificationActions';
import DefaultButton from './Buttons/Default';

const InfoNotification = ({
	className, text, icon, id, closeCallback, deleteNotification, button, buttonCallback,
}) => {

	const [isClose, isClosed] = useState(false);

	if (isClose) {
		setTimeout(() => {
			deleteNotification(id);
			closeCallback();
		}, 300);
	}

	const onClose = (e) => {
		e.preventDefault();
		isClosed(true);
	};

	const displayedButton = typeof button === 'object' ? button : typeof button === 'string' && <DefaultButton id={id} buttonText={button} buttonCallback={buttonCallback} />;

	return (
		<div className={`notification-list__item ${className} ${isClose && 'close'}`}>
			<div className="notification-list__item-container-left">
				{icon && <i className={`is-icon ${icon}-icon`} />}
				<span className="text">
					{text}
				</span>
			</div>
			<div className="notification-list__item-container-right">
				{displayedButton}
			</div>
			<a href="" onClick={(e) => onClose(e)}>
				<i className="is-icon close-white-icon" />
			</a>
		</div>
	);
};

InfoNotification.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string.isRequired,
	icon: PropTypes.string,
	id: PropTypes.string.isRequired,
	deleteNotification: PropTypes.func.isRequired,
	closeCallback: PropTypes.func,
	button: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string,
	]),
	buttonCallback: PropTypes.func,
};

InfoNotification.defaultProps = {
	className: '',
	icon: '',
	button: null,
	closeCallback: () => ({}),
	buttonCallback: () => ({}),
};

export default connect(
	() => ({}),
	(dispatch) => ({
		deleteNotification: (id) => dispatch(notificationActions.delete(id)),
	}),
)(InfoNotification);

