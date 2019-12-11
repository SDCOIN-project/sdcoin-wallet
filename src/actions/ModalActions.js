import { show } from 'redux-modal';
import { INFO_MODAL, CONFIRM_MODAL } from '../constants/ModalConstants';

class ModalActions {

	/**
	 * Info modal
	 * @param {Object} params
	 * @returns {Function}
	 */
	infoModal(params = {}) {
		return (dispatch) => {
			dispatch(show(INFO_MODAL, params));
		};
	}

	/**
	 * Confirmation modal
	 * @param {Object} params
	 * @returns {Function}
	 */
	confirmModal(params = {}) {
		return (dispatch) => {
			dispatch(show(CONFIRM_MODAL, params));
		};
	}

	/**
	 * @param {string} params.cancelButtonText
	 * @param {string} params.confirmButtonText
	 * @param {string} params.title
	 * @param {string} params.description
	 * @return {function(*)}
	 */
	confirmAsync(params) {
		return async (dispatch) => new Promise((resolve) => {
			dispatch(show(CONFIRM_MODAL, {
				...params,
				onClose: () => resolve(false),
				onCancel: () => resolve(false),
				onConfirm: () => resolve(true),
			}));
		});
	}

}

export default new ModalActions();
