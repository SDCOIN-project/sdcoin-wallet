import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from './../../../../Layout/Header';
import Switcher from './../../../../../components/Form/Switcher';

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
