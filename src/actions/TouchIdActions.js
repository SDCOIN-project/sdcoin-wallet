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

}

export default new TouchIdActions(touchIdReducer);
