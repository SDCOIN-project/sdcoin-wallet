import io from 'socket.io-client';
import GlobalReducer from '../reducers/GlobalReducer';
import BaseActions from './BaseActions';
import accountActions from './AccountActions';
import notificationActions from './NotificationActions';
import transactionHistoryActions from './TransactionHistoryActions';

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
				// Load data after start page
			]).then((data) => {
				dispatch(this.afterInit()).then(() => {});
				const account = JSON.parse(localStorage.getItem('account'));
				if (account) {
					dispatch(accountActions.authorisation({ address: account.address }));
				}
				resolve(data);
			}).catch((error) => {
				dispatch(notificationActions.errorNotification({ text: error.message }));
			}).then(() => {
				resolve();
			});
		});
	}

	initializeSocket(address) {
		return (dispatch) => {
			const socket = io(__SOCKET_URL__);
			dispatch(this.setValue('socket', socket));

			socket.on('connect', () => {
				socket.emit('subscribeToAddress', { address });
			});

			dispatch(transactionHistoryActions.initSocketEvents());
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


}

export default new GlobalActions(GlobalReducer);
