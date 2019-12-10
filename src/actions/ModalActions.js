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

}

export default new ModalActions();
