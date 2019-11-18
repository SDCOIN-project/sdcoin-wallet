import React from 'react';
import Button from './../../../components/Form/Button';

const StatusTransactionError = () => (
	<div className="status-transaction-page is-violet">
		<i className="is-icon transaction-failed-icon" />
		<div className="status-transaction-page__title">Something went wrong</div>
		<div className="status-transaction-page__text">Transaction has not been sent</div>
		<div className="dashboard-controls">
			<Button className="is-transparent is-white pin-page__button">Try again</Button>
		</div>
	</div>
);

export default StatusTransactionError;
