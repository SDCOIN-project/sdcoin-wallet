import BaseActions from './BaseActions';
import touchIdservice from '../services/TouchIdService';
import touchIdReducer from '../reducers/TouchIdReducer';
import { PASSWORD } from '../constants/GlobalConstants';
import GlobalActions from './GlobalActions';
import { KEY_PERMANENTLY_INVALIDATED_EXCEPTION } from '../constants/ErrorConstants';

const ERROR_PASS_DONT_EXISTS_CODE = '-5';

class TouchIdActions extends BaseActions {

	/**
	 * Save info to phone memory
	 * @param {string} password
	 * @returns {Promise<void>}
	 */
	save(password) {
		return async (dispatch) => {
			try {
				const isAvailable = await touchIdservice.isAvailable();
				if (isAvailable) {
					await touchIdservice.save(PASSWORD, password);
					dispatch(GlobalActions.setValue('alternativeIdEnabled', true));
				}
			} catch (error) {
				if (error.message === KEY_PERMANENTLY_INVALIDATED_EXCEPTION) {
					await touchIdservice.save(PASSWORD, password);
					dispatch(GlobalActions.setValue('alternativeIdEnabled', true));
				}
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

	verify(key, message) {
		return async (dispatch) => {
			try {
				return await touchIdservice.verify(key, message);
			} catch (e) {
				if (typeof e === 'string' && e.match(/ErrorMessage/)) {
					const error = JSON.parse(e);
					if (error.ErrorCode && error.ErrorCode === ERROR_PASS_DONT_EXISTS_CODE) {
						dispatch(GlobalActions.setValue('alternativeIdEnabled', false));
					}
				}
				throw new Error(e);
			}
		};
	}

	checkAltIdStatus() {
		return async (dispatch) => {
			const isAvailable = await touchIdservice.isAvailable();
			if (isAvailable) {
				const biometryVarName = (isAvailable === 'face') ? 'hasFaceId' : 'hasTouchId';
				dispatch(GlobalActions.setValue(biometryVarName, true));
			} else {
				await touchIdservice.delete(PASSWORD);
				dispatch(GlobalActions.setValue('hasFaceId', false));
				dispatch(GlobalActions.setValue('hasTouchId', false));
				dispatch(GlobalActions.setValue('alternativeIdEnabled', false));
			}
		};
	}

}

export default new TouchIdActions(touchIdReducer);
