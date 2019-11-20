import GlobalReducer from '../reducers/GlobalReducer';
import BaseActions from './BaseActions';
import accountActions from './AccountActions';
import web3Service from '../services/Web3Service';

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
			try {
				web3Service.init();

				Promise.all([
					// Load data after start page
				]).then((data) => {
					dispatch(this.afterInit()).then(() => {});
					const address = localStorage.getItem('address');
					if (address) {
						dispatch(accountActions.authorisation({ address }));
					}
					resolve(data);
				}).catch((error) => {
					throw error;
				}).then(() => {
					resolve();
				});

			} catch (error) {
				alert(error.message);
			}
		});
	}

}

export default new GlobalActions(GlobalReducer);
