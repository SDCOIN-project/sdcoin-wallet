import GlobalReducer from '../reducers/GlobalReducer';
import BaseActions from './BaseActions';

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
				// Load data before start page
			]).then((data) => {
				dispatch(this.afterInit()).then(() => {

				});
				resolve(data);
			}).catch((error) => {
				resolve(error);
			});
		});
	}

}

export default new GlobalActions(GlobalReducer);
