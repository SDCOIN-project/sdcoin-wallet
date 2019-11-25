import React from 'react';
import PropTypes from 'prop-types';
import Button from './../../../../components/Form/Button';

const Error = ({ onTryAgain, error }) => (
	<div className="status-transaction-page is-violet">
		<i className="is-icon transaction-failed-icon" />
		<div className="status-transaction-page__title">Transaction has not been sent</div>
		<div className="status-transaction-page__text">{error || 'Something went wrong'}</div>
		<div className="dashboard-controls">
			<Button className="is-transparent is-white pin-page__button" onClick={() => onTryAgain()}>
				Try again
			</Button>
		</div>
	</div>
);

Error.propTypes = {
	onTryAgain: PropTypes.func,
	error: PropTypes.string,
};

Error.defaultProps = {
	onTryAgain: () => {},
	error: null,
};

export default Error;
