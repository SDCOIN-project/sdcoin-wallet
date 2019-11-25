import React from 'react';
import PropTypes from 'prop-types';
import Button from './../../../../components/Form/Button';

const Success = ({ onDone }) => (
	<div className="status-transaction-page">
		<i className="is-icon transaction-successfully-icon" />
		<div className="status-transaction-page__title">Transaction has been sent successfully!</div>
		<div className="dashboard-controls">
			<Button className="is-transparent is-white pin-page__button" onClick={() => onDone()}>
				Got it
			</Button>
		</div>
	</div>
);

Success.propTypes = {
	onDone: PropTypes.func,
};

Success.defaultProps = {
	onDone: () => {},
};

export default Success;

