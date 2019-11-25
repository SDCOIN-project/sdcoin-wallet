import React from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../../history';

import {
	DASHBOARD_PATH,
	SEND_TRANSACTION_PATH,
	RECEIVE_PATH,
	SETTINGS_PATH,
} from '../../../constants/RouterConstants';

const Sidebar = () => {

	const isActive = (path) => (history.location.pathname === path ? 'is-active' : '');

	return (
		<div className="sidebar">
			<NavLink to={DASHBOARD_PATH} className={`sidebar-item ${isActive(DASHBOARD_PATH)}`}>
				<i className="wallet-icon is-icon" />
				<p>Wallet</p>
			</NavLink>
			<NavLink to={SEND_TRANSACTION_PATH} className={`sidebar-item ${isActive(SEND_TRANSACTION_PATH)}`}>
				<i className="send-icon is-icon" />
				<p>Send</p>
			</NavLink>
			<NavLink to={RECEIVE_PATH} className={`sidebar-item ${isActive(RECEIVE_PATH)}`}>
				<i className="receive-icon is-icon" />
				<p>Receive</p>
			</NavLink>
			<NavLink to={SETTINGS_PATH} className={`sidebar-item ${isActive(SETTINGS_PATH)}`}>
				<i className="settings-icon is-icon" />
				<p>Settings</p>
			</NavLink>
		</div>
	);
};

export default Sidebar;
