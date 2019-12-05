class ShareService {

	constructor() {
		this.plugin = null;
	}


	get sharePlugin() {
		if (!window.plugins || !window.plugins.socialsharing) {
			throw new Error('Share unknown error');
		}
		if (!this.plugin) {
			this.plugin = window.plugins.socialsharing;
		}
		return this.plugin;
	}

	async shareImage(image) {
		const options = {
			message: '',
			subject: '',
			files: [image],
		};
		return new Promise((resolve, reject) => {
			this.sharePlugin.shareWithOptions(options, () => resolve(), (err) => reject(err));
		});
	}

}

const shareService = new ShareService();
export default shareService;
