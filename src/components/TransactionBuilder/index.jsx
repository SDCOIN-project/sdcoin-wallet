import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PREPARE_STATUS, SENDING_STATUS, ERROR_STATUS, SUCCESS_STATUS } from '../../constants/TransactionConstants';
import ValidatePinCode from '../PinCode/ValidatePinCode';

import TransactionStatus from './TransactionStatus';

import accountActions from '../../actions/AccountActions';
import ethService from '../../services/EthService';

const TransactionBuilder = ({
	children, handleTransaction, onConfirmed, onDone,
}) => {
	const [status, setStatus] = useState(PREPARE_STATUS);
	const [txError, setTxError] = useState(null);
	const [values, setValues] = useState();
	const [requestPinCode, setRequestPinCode] = useState(false);

	const clearStates = () => {
		setStatus(PREPARE_STATUS);
		setTxError(null);
		setValues(undefined);
		setRequestPinCode(false);
	};

	const submitTransaction = (sendingValues) => {
		setValues(sendingValues);
		setRequestPinCode(true);
	};

	const sendingTransaction = async (data) => {
		setStatus(SENDING_STATUS);
		setRequestPinCode(false);

		try {
			const receipt = await handleTransaction(data);
			setStatus(SUCCESS_STATUS);
			onConfirmed(receipt);
		} catch (error) {
			setStatus(ERROR_STATUS);
			setTxError(error.message);
		}
	};

	if (status === PREPARE_STATUS) {
		if (requestPinCode) {
			return (
				<ValidatePinCode
					title="Enter PIN"
					validate={(pinCode) => accountActions.decryptAndWalletAdd(pinCode)}
					onSubmit={() => sendingTransaction(values).finally(() => ethService.clearWallet())}
					onBack={() => setRequestPinCode(false)}
				/>
			);
		}

		return typeof children === 'function' ? children({ submitTransaction }) : children;
	}

	return (
		<div className="wrapper-transaction">
			<TransactionStatus
				status={status}
				error={txError}
				onDone={() => {
					clearStates();
					onDone();
				}}
				onTryAgain={() => clearStates()}
			/>
		</div>
	);

};


TransactionBuilder.propTypes = {
	children: PropTypes.func.isRequired,
	handleTransaction: PropTypes.func.isRequired,
	onConfirmed: PropTypes.func,
	onDone: PropTypes.func,
};

TransactionBuilder.defaultProps = {
	onConfirmed: () => {},
	onDone: () => {},
};

export default TransactionBuilder;
