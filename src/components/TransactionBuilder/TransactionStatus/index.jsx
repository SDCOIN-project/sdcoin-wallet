import React from 'react';
import PropTypes from 'prop-types';

import Sending from './Sending';
import Success from './Success';
import Error from './Error';

import { SENDING_STATUS, SUCCESS_STATUS } from '../../../constants/TransactionConstants';

const TransactionStatus = ({
	status, hash, onDone, onTryAgain, error,
}) => {
	switch (status) {
		case SENDING_STATUS:
			return <Sending hash={hash} />;
		case SUCCESS_STATUS:
			return <Success hash={hash} onDone={onDone} />;
		default:
			return <Error hash={hash} onTryAgain={onTryAgain} error={error} />;
	}
};

TransactionStatus.propTypes = {
	hash: PropTypes.string,
	status: PropTypes.string.isRequired,
	error: PropTypes.string,
	onDone: PropTypes.func.isRequired,
	onTryAgain: PropTypes.func.isRequired,
};

TransactionStatus.defaultProps = {
	error: '',
	hash: '',
};

export default TransactionStatus;
