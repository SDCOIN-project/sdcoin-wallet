import React from 'react';
import { connectModal } from 'redux-modal';

import { NO_INTERNET_MODAL } from '../../../constants/ModalConstants';

const NoInternetModal = () => (
	<div className="show-top-all">
		<div className="status-transaction-page no-internet-page">
			<i className="is-icon no-internet-icon" />
			<div className="status-transaction-page__title">There is no <br />Internet connection</div>
			<div className="status-transaction-page__text">Please turn on Internet on your device</div>
			<div className="dashboard-controls" />
		</div>
	</div>
);

export default connectModal({ name: NO_INTERNET_MODAL })(NoInternetModal);
