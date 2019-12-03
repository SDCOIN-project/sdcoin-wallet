import React, { useState } from 'react';
// import Media from 'react-media';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from './../../../../Layout/Header';
import Switcher from './../../../../../components/Form/Switcher';

import AccountActions from '../../../../../actions/AccountActions';
import { BACKUP_PATH, CHANGE_PASSWORD_PATH, CREATE_TOUCH_ID_PATH } from '../../../../../constants/RouterConstants';
import history from '../../../../../history';
import GlobalActions from '../../../../../actions/GlobalActions';
import { ICONS } from '../../../../../constants/NotificationConstants';
import notificationActions from '../../../../../actions/NotificationActions';

const Index = ({
	logout, hasTouchId, hasFaceId, alternativeIdEnabled, disableAltId, showNotification,
}) => {

	const disableAltIdAndNotify = () => {
		showNotification({ text: `${hasFaceId ? 'Face ID' : 'Touch ID'} has been deactivated`, button: 'OK', icon: ICONS.lock });
		disableAltId();
	};

	const [altIdEnabled, setAltIdEnabled] = useState(alternativeIdEnabled);

	return (
		<React.Fragment>
			<Header title="Settings" />
			<div className="dashboard settings-page">
				<NavLink to={CHANGE_PASSWORD_PATH} className="dashboard-arrow-line">
					<div className="icon-container">
						<i className="is-icon lock-icon" />
					</div>
					<div className="dashboard-arrow-line__container">
						<span className="dashboard-arrow-line__text">Change Password</span>
						<i className="is-icon arrow-gray-icon" />
					</div>
				</NavLink>
				<a
					href="#"
					className="dashboard-arrow-line no-active-effect"
					onClick={(e) => {
						e.preventDefault();
						setAltIdEnabled(e.target.checked);
						if (!altIdEnabled) {
							if (hasFaceId || hasTouchId) {
								history.push(CREATE_TOUCH_ID_PATH);
							}
						} else {
							disableAltIdAndNotify();
						}
					}}
				>
					<div className="icon-container">
						<i className="is-icon face-id-icon" />
					</div>
					<div className="dashboard-arrow-line__container">
						<span className="dashboard-arrow-line__text">Enable {hasFaceId ? 'Face ID' : 'Touch ID'}</span>
						<Switcher
							disabled={!hasFaceId && !hasTouchId}
							checked={altIdEnabled}
						/>
					</div>
				</a>
				<NavLink to={BACKUP_PATH} className="dashboard-arrow-line">
					<div className="icon-container">
						<i className="is-icon backup-icon" />
					</div>
					<div className="dashboard-arrow-line__container no-border">
						<span className="dashboard-arrow-line__text">Backup</span>
						<i className="is-icon arrow-gray-icon" />
					</div>
				</NavLink>
				<a
					href=""
					onClick={(e) => {
						e.preventDefault();
						logout();
					}}
					className="dashboard-arrow-line bottom-container"
				>
					<div className="icon-container">
						<i className="is-icon logout-icon" />
					</div>
					<span>Logout</span>
				</a>
			</div>
		</React.Fragment>
	);
};

Index.propTypes = {
	hasTouchId: PropTypes.bool.isRequired,
	hasFaceId: PropTypes.bool.isRequired,
	alternativeIdEnabled: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	disableAltId: PropTypes.func.isRequired,
	showNotification: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		hasTouchId: state.global.get('hasTouchId'),
		hasFaceId: state.global.get('hasFaceId'),
		alternativeIdEnabled: state.global.get('alternativeIdEnabled'),
	}),
	(dispatch) => ({
		logout: () => dispatch(AccountActions.logout()),
		showNotification: (currency) => dispatch(notificationActions.add(currency)),
		disableAltId: () => dispatch(GlobalActions.disableAltId()),
	}),
)(Index);
