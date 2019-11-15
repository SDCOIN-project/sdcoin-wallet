import React from 'react';
import { NavLink } from 'react-router-dom';

import {
	DASHBOARD_PATH,
	SEND_TRANSACTION_PATH,
	RECEIVE_PATH,
	SETTINGS_PATH,
} from '../../../constants/RouterConstants';

const Sidebar = () => (
	<div className="sidebar">
		<NavLink to={DASHBOARD_PATH} className="sidebar-item">
			<i className="wallet-icon is-icon" />
			<p>Wallet</p>
		</NavLink>
		<NavLink to={SEND_TRANSACTION_PATH} className="sidebar-item">
			<i className="send-icon is-icon" />
			<p>Send</p>
		</NavLink>
		<NavLink to={RECEIVE_PATH} className="sidebar-item">
			<i className="receive-icon is-icon" />
			<p>Receive</p>
		</NavLink>
		<NavLink to={SETTINGS_PATH} className="sidebar-item">
			<i className="settings-icon is-icon" />
			<p>Settings</p>
		</NavLink>
	</div>
);

export default Sidebar;
