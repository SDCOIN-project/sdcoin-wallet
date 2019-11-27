import React from 'react';
// import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from './../../../../Layout/Header';
import Switcher from './../../../../../components/Form/Switcher';
// import Button from './../../../../../components/Form/Button';
// import Notification from './../../../../../components/Notifications';

import AccountActions from '../../../../../actions/AccountActions';
import { BACKUP_PATH, CHANGE_PASSWORD_PATH } from '../../../../../constants/RouterConstants';

const Index = ({ logout }) => (
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
			<a href="#" className="dashboard-arrow-line no-active-effect">
				<div className="icon-container">
					<i className="is-icon fingerprint-icon" />
				</div>
				<div className="dashboard-arrow-line__container">
					<span className="dashboard-arrow-line__text">Enable Touch ID</span>
					<Switcher
						checked
					/>
				</div>
			</a>
			<a href="#" className="dashboard-arrow-line no-active-effect">
				<div className="icon-container">
					<i className="is-icon face-id-icon" />
				</div>
				<div className="dashboard-arrow-line__container">
					<span className="dashboard-arrow-line__text">Enable Face ID</span>
					<Switcher
						checked={false}
					/>
				</div>
			</a>
			{/* <div className="notification-list"> */}
			{/* <Notification >
					<div className="notification-list__item-container-left">
						<span className="text">Something has happened</span>
					</div>
					<div className="notification-list__item-container-right">
						<Button className="notification-button">Accept</Button>
					</div>
				</Notification>
				<Notification>
					<div className="notification-list__item-container-left payment">
						<i className="is-icon bell-white-icon" />
						<MediaQuery maxWidth={374}>
							{(matches) => {
								if (matches) {
									return (<span className="text">New incoming payment</span>);
								}
								return (<span className="text">You have new incoming payment</span>);
							}}
						</MediaQuery>
					</div>
					<div className="notification-list__item-container-right">
						<Button className="qr-code-button">
							<i className="is-icon qr-code-small-white-icon" />
							<span>Get Payment</span>
						</Button>
					</div>
				</Notification>
				<Notification close={false}>
					<div className="notification-list__item-container-left">
						<i className="is-icon lock-white-icon" />
						<span className="text">PIN has been changed successfully!</span>
					</div>
					<div className="notification-list__item-container-right">
						<Button className="notification-button is-notification-button-small">OK</Button>
					</div>
				</Notification> */}
			{/* </div> */}
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

Index.propTypes = {
	logout: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		logout: () => dispatch(AccountActions.logout()),
	}),
)(Index);
