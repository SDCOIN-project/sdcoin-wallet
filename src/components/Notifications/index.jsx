import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({
	className, close, children, ...props
}) => (
	<div
		className={`notification-list__item ${className}`}
		{...props}
	>
		{children}
		{
			close && (
				<a href="#">
					<i className="is-icon close-white-icon" />
				</a>
			)
		}
	</div>
);

Notification.propTypes = {
	className: PropTypes.string,
	close: PropTypes.bool,
	children: PropTypes.any,
};

Notification.defaultProps = {
	className: '',
	close: true,
	children: null,
};


export default Notification;
