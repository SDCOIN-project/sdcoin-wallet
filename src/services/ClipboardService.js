class ClipboardService {

	get clipboard() {
		if (!window.cordova || !window.cordova.plugins || !window.cordova.plugins.clipboard) {
			return null;
		}
		return window.cordova.plugins.clipboard;
	}

	copy(text) {
		this.clipboard.copy(text);
	}

}

export default new ClipboardService();
