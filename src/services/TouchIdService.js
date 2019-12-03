import { FINGER_PRINT_TYPE } from '../constants/GlobalConstants';

class TouchIdService {

	get touchid() {
		if (!window.plugins || !window.plugins.touchid) {
			return null;
		}
		return window.plugins.touchid;
	}

	isAvailable() {
		if (!this.touchid) {
			return null;
		}
		return new Promise((resolve) => {
			this.touchid.isAvailable((biometryType) => {
				resolve(biometryType);
			}, () => {
				resolve(null);
			});
		});
	}

	async has(key) {
		return new Promise((resolve) => {
			if (!this.touchid) {
				resolve(false);
			}
			this.touchid.has(key, () => resolve(true), () => resolve(false));
		});
	}

	verify(key, message) {
		return new Promise((resolve, reject) => {
			this.touchid.verify(key, message, (result) => {
				resolve(result);
			}, (error) => {
				reject(error);
			});
		});
	}

	save(key, value, userAuthenticationRequired = true) {
		return new Promise((resolve, reject) => {
			this.touchid.save(key, value, userAuthenticationRequired, (result) => {
				resolve(result);
			}, (error) => {
				reject(error);
			});
		});
	}

	delete(key) {
		return new Promise((resolve, reject) => {
			this.touchid.delete(key, (result) => {
				resolve(result);
			}, (error) => {
				reject(error);
			});
		});
	}

	getAvailableType() {
		return async () => {
			const isAvailable = await this.isAvailable();
			if (isAvailable !== 'OK') return FINGER_PRINT_TYPE.TOUCH;
			if (isAvailable !== 'face') return FINGER_PRINT_TYPE.FACE;
			throw new Error(isAvailable);
		};
	}

}

export default new TouchIdService();
