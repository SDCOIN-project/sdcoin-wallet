import scanQrCodeReducer from '../reducers/ScanQrCodeReducer';
import BaseActions from './BaseActions';

class ScanQrCodeActions extends BaseActions {

	/**
	 * Start scan qr code
	 * @param {string} title
	 * @param {string} description
	 * @param {Function} onScan
	 * @returns {function(...[*]=)}
	 */
	scan({ title, description, onScan = () => {} } = {}) {
		return (dispatch) => {
			dispatch(this.setMultipleValue({
				show: true, title, description, onScan,
			}));
		};
	}

}

export default new ScanQrCodeActions(scanQrCodeReducer);
