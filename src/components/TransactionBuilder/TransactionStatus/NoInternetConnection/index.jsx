import React from 'react';
import Button from './../../../../components/Form/Button';

const NoInternetConnection = () => (
	<div className="status-transaction-page no-internet-page">
		<i className="is-icon no-internet-icon" />
		<div className="status-transaction-page__title">There is no <br />Internet connection</div>
		<div className="status-transaction-page__text">Please turn on Internet on your device</div>
		<div className="dashboard-controls">
			<Button className="is-transparent is-white pin-page__button opacity-0">
				Try again
			</Button>
		</div>
	</div>
);


export default NoInternetConnection;

