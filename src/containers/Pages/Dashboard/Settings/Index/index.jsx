import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import history from '../../../../../history';
import Header from './../../../../Layout/Header';
import Switcher from './../../../../../components/Form/Switcher';

import AccountActions from '../../../../../actions/AccountActions';
import touchIdActions from '../../../../../actions/TouchIdActions';
import notificationActions from '../../../../../actions/NotificationActions';
import modalActions from '../../../../../actions/ModalActions';

import { ICONS } from '../../../../../constants/NotificationConstants';
import { BACKUP_PATH, CHANGE_PASSWORD_PATH, CREATE_TOUCH_ID_PATH } from '../../../../../constants/RouterConstants';

const Index = ({
	logout, hasTouchId, hasFaceId, alternativeIdEnabled, disableAltId, showNotification, showConfirmModal,
}) => {

	const disableAltIdAndNotify = () => {
		showNotification({ text: `${hasFaceId ? 'Face ID' : 'Touch ID'} has been deactivated`, button: 'OK', icon: ICONS.lock });
		disableAltId();
	};

	const [altIdEnabled, setAltIdEnabled] = useState(alternativeIdEnabled);

	useEffect(() => {
		setAltIdEnabled(alternativeIdEnabled);
	}, [alternativeIdEnabled]);

	return (
		<React.Fragment>
			<Header title="Settings" />
			<TransitionGroup>
				<CSSTransition
					in
					appear
					timeout={500}
					classNames="dashboard-transition"
				>
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
						{hasFaceId || hasTouchId ? (
							<a
								href="#"
								className="dashboard-arrow-line no-active-effect"
								onClick={(e) => {
									e.preventDefault();
									setAltIdEnabled(e.target.checked);
									if (!altIdEnabled) {
										history.push(CREATE_TOUCH_ID_PATH);
									} else {
										disableAltIdAndNotify();
									}
								}}
							>
								<div className="icon-container">
									<i className={`is-icon ${hasFaceId ? 'face-id-icon' : 'fingerprint-icon'}`} />
								</div>
								<div className="dashboard-arrow-line__container">
									<span className="dashboard-arrow-line__text">Enable {hasFaceId ? 'Face ID' : 'Touch ID'}</span>
									<Switcher
										disabled={!hasFaceId && !hasTouchId}
										checked={altIdEnabled}
									/>
								</div>
							</a>
						) : null}
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
								showConfirmModal({
									title: 'Are you sure to logout?',
									description: 'Make sure that you have the BrainKey backup',
									cancelButtonText: 'Cancel',
									confirmButtonText: 'Confirm',
									onConfirm: () => logout(),
								});
							}}
							className="dashboard-arrow-line bottom-container logout last__row-animation"
						>
							<div className="icon-container">
								<i className="is-icon logout-icon" />
							</div>
							<span>Logout</span>
						</a>
					</div>
				</CSSTransition>
			</TransitionGroup>
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
	showConfirmModal: PropTypes.func.isRequired,
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
		disableAltId: () => dispatch(touchIdActions.disableAltId()),
		showConfirmModal: (params) => dispatch(modalActions.confirmModal(params)),
	}),
)(Index);
