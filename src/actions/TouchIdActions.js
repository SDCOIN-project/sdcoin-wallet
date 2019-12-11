import BaseActions from './BaseActions';
import touchIdservice from '../services/TouchIdService';
import touchIdReducer from '../reducers/TouchIdReducer';
import { PASSWORD } from '../constants/GlobalConstants';
import GlobalActions from './GlobalActions';

class TouchIdActions extends BaseActions {

	/**
	 * Save info to phone memory
	 * @param {string} password
	 * @returns {Promise<void>}
	 */
	save(password) {
		return async (dispatch) => {
			const isAvailable = await touchIdservice.isAvailable();
			if (isAvailable) {
				await touchIdservice.save(PASSWORD, password);
				dispatch(GlobalActions.setValue('alternativeIdEnabled', true));
			}
		};
	}

	disableAltId() {
		return async (dispatch) => {
			dispatch(GlobalActions.setValue('alternativeIdEnabled', false));
			return touchIdservice.delete(PASSWORD);
		};
	}

	updatePassword(newPassword) {
		return async (dispatch, getState) => {
			const isEnabled = getState().global.get('alternativeIdEnabled');
			if (!isEnabled) {
				return;
			}
			await dispatch(this.save(newPassword));
		};
	}

}

export default new TouchIdActions(touchIdReducer);
