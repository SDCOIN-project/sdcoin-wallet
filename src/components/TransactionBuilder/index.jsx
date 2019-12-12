import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ValidatePinCode from '../PinCode/ValidatePinCode';
import TransactionStatus from './TransactionStatus';

import accountActions from '../../actions/AccountActions';
import modalActions from '../../actions/ModalActions';
import {
	PREPARE_STATUS,
	SENDING_STATUS,
	ERROR_STATUS,
	SUCCESS_STATUS,
} from '../../constants/TransactionConstants';
import walletService from '../../services/WalletService';

const TransactionBuilder = ({
	children, handleTransaction, onSend, onDone, showConfirmModal,
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

	/**
	 * Display confirmation notification before entering the PIN
	 * @param {Object} sendingValues
	 * @param {Object} confirmationInfo
	 * @param {string} confirmationInfo.title
	 * @param {string} confirmationInfo.description
	 * @param {string} confirmationInfo.cancelButtonText
	 * @param {string} confirmationInfo.confirmButtonText
	 * @param {function} confirmationInfo.onConfirm
	 * @param {function} confirmationInfo.onCancel
	 * @param {function} confirmationInfo.onClose
	 */
	const submitTransaction = (sendingValues, confirmationInfo = {}) => {
		showConfirmModal({
			...confirmationInfo,
			onConfirm: () => {
				setValues(sendingValues);
				setRequestPinCode(true);
			},
		});
	};

	const sendingTransaction = async (data) => {
		setStatus(SENDING_STATUS);
		setRequestPinCode(false);

		try {
			await handleTransaction(data);
			onSend();
			setStatus(SUCCESS_STATUS);
		} catch (error) {
			setStatus(ERROR_STATUS);
			setTxError(error.message);
		}
	};

	if (status === PREPARE_STATUS) {
		if (requestPinCode) {
			return (
				<ValidatePinCode
					title="Confirm with PIN"
					validate={(pinCode) => accountActions.unlockWallet(pinCode)}
					onSubmit={() => sendingTransaction(values).finally(() => walletService.lock())}
					onBack={() => setRequestPinCode(false)}
				/>
			);
		}

		return typeof children === 'function' ? children({ submitTransaction }) : children;
	}

	return (
		<div className="show-top-all">
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
	showConfirmModal: PropTypes.func.isRequired,
	onDone: PropTypes.func,
	onSend: PropTypes.func,
};

TransactionBuilder.defaultProps = {
	onDone: () => {},
	onSend: () => {},
};

export default connect(
	() => ({}),
	(dispatch) => ({
		showConfirmModal: (params) => dispatch(modalActions.confirmModal(params)),
	}),
)(TransactionBuilder);
