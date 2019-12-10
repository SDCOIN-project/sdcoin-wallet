import BaseActions from './BaseActions';
import touchIdservice from '../services/TouchIdService';
import touchIdReducer from '../reducers/TouchIdReducer';
import { PASSWORD } from '../constants/GlobalConstants';
import GlobalActions from './GlobalActions';
import notificationActions from './NotificationActions';

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
		return (dispatch) => {
			dispatch(this.setValue('alternativeIdEnabled', false));
			try {
				touchIdservice.delete(PASSWORD, (result) => result, (error) => {
					throw error;
				});
			} catch (error) {
				dispatch(notificationActions.errorNotification({ text: error.message }));
			}
		};
	}

}

export default new TouchIdActions(touchIdReducer);
