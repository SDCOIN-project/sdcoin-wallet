class QRCodeService {

	get qrcode() {
		if (!window.cordova || !window.cordova.plugins || !window.cordova.plugins.qrcodejs) {
			return null;
		}
		return window.cordova.plugins.qrcodejs;
	}

	encode(data, options) {
		return new Promise((resolve, reject) => {
			this.qrcode.encode('TEXT_TYPE', data, (result) => resolve(result), (error) => reject(error), options);
		});
	}

}

export default new QRCodeService();
