import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import { Modal } from 'semantic-ui-react';

import { INFO_MODAL } from '../../../constants/ModalConstants';

const InfoModal = ({
	show, buttonTitle, handleHide, title, description, onCallback,
}) => (
	<Modal open={show} >
		<div className="modal__inner">
			<div className="modal__title">{title}</div>
			<div className="modal__description">{description}</div>
			<div className="modal__footer">
				<button
					onClick={() => {
						onCallback();
						handleHide();
					}}
				>
					{buttonTitle}
				</button>
			</div>
		</div>
	</Modal >
);

InfoModal.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	buttonTitle: PropTypes.string,
	handleHide: PropTypes.func.isRequired,
	onCallback: PropTypes.func,
};

InfoModal.defaultProps = {
	buttonTitle: 'Ok',
	title: 'Info',
	description: '',
	onCallback: () => {},
};

export default connectModal({ name: INFO_MODAL })(InfoModal);
