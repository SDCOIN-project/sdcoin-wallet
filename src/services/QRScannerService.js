class QRScannerService {

	get scanner() {
		const isEnabled = QRScanner;
		if (!isEnabled) {
			throw new Error('QRScanner not available');
		}
		return QRScanner;
	}

	async scan() {
		return new Promise((resolve, reject) => {
			this.scanner.scan((error, text) => {
				if (error) {
					// eslint-disable-next-line no-underscore-dangle
					reject(Error(error._message));
				}

				resolve(text);
			});
		});
	}

	prepare() {
		return new Promise((resolve, reject) => {
			this.scanner.prepare((error, status) => {
				if (error) {
					// eslint-disable-next-line no-underscore-dangle
					reject(new Error(error._message));
				}
				resolve(status);
			});
		});
	}

	show() {
		return new Promise((resolve) => {
			this.scanner.show((status) => {
				resolve(status);
			});
		});
	}

	hide() {
		return new Promise((resolve) => {
			this.scanner.hide((status) => {
				resolve(status);
			});
		});
	}

	destroy() {
		return new Promise((resolve) => {
			this.scanner.destroy((status) => {
				resolve(status);
			});
		});
	}

}

export default new QRScannerService();
