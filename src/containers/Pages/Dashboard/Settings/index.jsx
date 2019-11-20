import React from 'react';
// import Media from 'react-media';
import Header from './../../../Layout/Header';
import Switcher from './../../../../components/Form/Switcher';
// import Button from './../../../../components/Form/Button';
// import Notification from './../../../../components/Notifications';

const Settings = () => (
	<React.Fragment>
		<Header backButton={false} title="Settings" />
		<div className="dashboard settings-page">
			<a href="#" className="dashboard-arrow-line">
				<div className="icon-container">
					<i className="is-icon lock-icon" />
				</div>
				<div className="dashboard-arrow-line__container">
					<span className="dashboard-arrow-line__text">Change Password</span>
					<i className="is-icon arrow-gray-icon" />
				</div>
			</a>
			<a href="#" className="dashboard-arrow-line">
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
			<a href="#" className="dashboard-arrow-line">
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
			<div className="notification-list">
				{/* <Notification>
					<div className="notification-list__item-container-left">
						<span className="text">Something has happened</span>
					</div>
					<div className="notification-list__item-container-right">
						<Button className="notification-button">Accept</Button>
					</div>
				</Notification> */}
				{/* <Notification>
					<div className="notification-list__item-container-left payment">
						<i className="is-icon bell-white-icon" />
						<Media query="(max-width: 374px)">
							{(matches) =>
								(matches ? (
									<span className="text">New incoming payment</span>
								) : (
									<span className="text">You have new incoming payment</span>
								))
							}
						</Media>
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
			</div>
			<a href="#" className="dashboard-arrow-line">
				<div className="icon-container">
					<i className="is-icon backup-icon" />
				</div>
				<div className="dashboard-arrow-line__container no-border">
					<span className="dashboard-arrow-line__text">Backup</span>
					<i className="is-icon arrow-gray-icon" />
				</div>
			</a>
			<a href="#" className="dashboard-arrow-line bottom-container">
				<div className="icon-container">
					<i className="is-icon logout-icon" />
				</div>
				<span>Logout</span>
			</a>
		</div>
	</React.Fragment>

);

export default Settings;
