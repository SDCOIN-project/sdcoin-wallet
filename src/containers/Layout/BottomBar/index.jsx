import React from 'react';

const Sidebar = () => (
	<div className="sidebar">
		<a href="#" className="sidebar-item is-active">
			<i className="wallet-icon is-icon" />
			<p>Wallet</p>
		</a>
		<a href="#" className="sidebar-item">
			<i className="send-icon is-icon" />
			<p>Send</p>
		</a>
		<a href="#" className="sidebar-item">
			<i className="receive-icon is-icon" />
			<p>Receive</p>
		</a>
		<a href="#" className="sidebar-item">
			<i className="settings-icon is-icon" />
			<p>Settings</p>
		</a>
	</div>
);

export default Sidebar;
