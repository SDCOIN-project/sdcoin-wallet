import React from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../../history';
import { WalletIcon, ReceiveIcon, SettingsIcon, SendIcon } from './../../../constants/SidebarIcon';

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
				<i className="is-icon  wallet-icon">{WalletIcon}</i>
				<p>Wallet</p>
			</NavLink>
			<NavLink to={SEND_TRANSACTION_PATH} className={`sidebar-item ${isActive(SEND_TRANSACTION_PATH)}`}>
				<i className="is-icon">{SendIcon}</i>
				<p>Send</p>
			</NavLink>
			<NavLink to={RECEIVE_PATH} className={`sidebar-item ${isActive(RECEIVE_PATH)}`}>
				<i className="is-icon">{ReceiveIcon}</i>
				<p>Receive</p>
			</NavLink>
			<NavLink to={SETTINGS_PATH} className={`sidebar-item ${isActive(SETTINGS_PATH)}`}>
				<i className="is-icon">{SettingsIcon}</i>
				<p>Settings</p>
			</NavLink>
		</div>
	);
};

export default Sidebar;
