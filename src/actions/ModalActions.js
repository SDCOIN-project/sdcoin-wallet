import { show } from 'redux-modal';
import { INFO_MODAL } from '../constants/ModalConstants';

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

}

export default new ModalActions();
