import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import { Modal } from 'semantic-ui-react';

import Button from './../../../components/Form/Button';
import { CONFIRM_MODAL } from '../../../constants/ModalConstants';

const ConfirmModal = ({
	show, handleHide, title, description, cancelButtonText, confirmButtonText, onConfirm, onCancel, onClose,
}) => {

	const onCloseModal = () => {
		onClose();
		handleHide();
	};

	const onCancelModal = () => {
		onCancel();
		onCloseModal();
	};

	const onSubmitModal = () => {
		onConfirm();
		onCloseModal();
	};

	return (
		<Modal
			open={show}
			closeOnDimmerClick={false}
			className="confirmation"
			onClose={() => onCancelModal()}
		>
			<div className="confirmation-container">
				<div className="confirmation-title">{title}</div>
				<div className="confirmation-text">{description}</div>
			</div>
			<div className="confirmation-controls">
				<Button className="is-transparent is-white" onClick={() => onCancelModal()}>
					{cancelButtonText}
				</Button>
				<Button className="is-transparent is-white" onClick={() => onSubmitModal()}>
					{confirmButtonText}
				</Button>
			</div>
		</Modal>
	);
};

ConfirmModal.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	cancelButtonText: PropTypes.string.isRequired,
	confirmButtonText: PropTypes.string.isRequired,
	handleHide: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func,
	onClose: PropTypes.func,
};

ConfirmModal.defaultProps = {
	onClose: () => {},
	onCancel: () => {},
};

export default connectModal({ name: CONFIRM_MODAL })(ConfirmModal);
