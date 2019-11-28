import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DISPLAYED_NOTITFICATION_COUNT } from '../../constants/NotificationConstants';
import Item from './Item';

const Notifications = ({ notifications }) => {

	const displayedNotifications = notifications.slice(0, DISPLAYED_NOTITFICATION_COUNT).reverse();

	return (
		<div className="notification-list">
			{displayedNotifications.map(({
				text, icon, closeCallback, className, button, buttonCallback, id,
			}) => (
				<Item
					key={id}
					text={text}
					icon={icon}
					className={className}
					id={id}
					closeCallback={closeCallback}
					button={button}
					buttonCallback={buttonCallback}
				/>
			))}
		</div>
	);
};

Notifications.propTypes = {
	notifications: PropTypes.array.isRequired,
};

export default connect((state) => ({
	notifications: state.notifications.toJSON(),
}))(Notifications);
