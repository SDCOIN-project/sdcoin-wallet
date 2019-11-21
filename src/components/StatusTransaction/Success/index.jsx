import React from 'react';
import Button from './../../../components/Form/Button';

const StatusTransactionSuccess = () => (
	<div className="status-transaction-page">
		{/* add a class - "payment-success-icon" to change the image, and remove class transaction-successfully-icon */}
		<i className="is-icon transaction-successfully-icon" />
		<div className="status-transaction-page__title">Transaction has been sent successfully!</div>
		<div className="dashboard-controls">
			<Button className="is-transparent is-white pin-page__button">Got it</Button>
		</div>
	</div>
);

export default StatusTransactionSuccess;
