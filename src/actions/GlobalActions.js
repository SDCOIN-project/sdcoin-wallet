import GlobalReducer from '../reducers/GlobalReducer';
import BaseActions from './BaseActions';
import accountActions from './AccountActions';
import touchIdService from '../services/TouchIdService';
import { PASSWORD } from '../constants/GlobalConstants';
import notificationActions from './NotificationActions';
import shareService from '../services/ShareService';

class GlobalActions extends BaseActions {

	/**
	 *  Actions after init app
	 * @returns {function(*): *}
	 */
	afterInit() {
		return () => new Promise((resolve, reject) => {
			Promise.all([
				// Load data after start page
			]).then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	/**
	 * Init app
	 * @returns {function(*=): Promise<any>}
	 */
	init() {
		return (dispatch) => new Promise((resolve) => {
			Promise.all([

				touchIdService.isAvailable((biometryType) => biometryType),
				touchIdService.has(PASSWORD),
				// Load data after start page
			]).then((data) => {
				dispatch(this.afterInit()).then(() => {});
				const account = JSON.parse(localStorage.getItem('account'));
				if (account) {
					dispatch(accountActions.authorisation({ address: account.address }));
				}
				if (data[0]) {
					const biometryVarName = (data[0] === 'face') ? 'hasFaceId' : 'hasTouchId';
					dispatch(this.setValue(biometryVarName, true));
					dispatch(this.setValue('alternativeIdEnabled', !!data[1]));
				}
				resolve(data);
			}).catch((error) => {
				dispatch(notificationActions.errorNotification({ text: error.message }));
			}).then(() => {
				resolve();
			});

		});
	}

	disableAltId() {
		return (dispatch) => {
			dispatch(this.setValue('alternativeIdEnabled', false));
			try {
				touchIdService.delete(PASSWORD, (result) => result, (error) => {
					throw error;
				});
			} catch (error) {
				dispatch(notificationActions.errorNotification({ text: error.message }));
			}
		};
	}

	deactivateSocket() {
		return (dispatch, getState) => {
			const socket = getState().global.get('socket');

			if (socket) {
				socket.disconnect();
			}

			dispatch(this.setValue('socket', null));
		};
	}

	unlock() {
		return (dispatch) => {
			dispatch(this.setValue('isLocked', false));
		};
	}

	shareImage(image) {
		return async () => {
			await shareService.shareImage(image);
		};
	}

}

export default new GlobalActions(GlobalReducer);
