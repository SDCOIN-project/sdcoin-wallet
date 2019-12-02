/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

/**
 * Base actions for work with store by selected reducer
 */
export default class BaseActions {

	/** Select reducer
     * @constructor
     * @param reducer
     */
	constructor(reducer) {
		this.reducer = reducer;
	}

	/**
     * Set value to reducer
     * @param {string|array} field
     * @param {*} value
     * @param {boolean} [isFromJS]
     * @returns {function}
     */
	setValue(field, value, isFromJS = true) {
		return this._callAction('set', { field, value, isFromJS });
	}

	/**
     * Set multiple values
     * @param {Object} payload
     * @returns {Function}
     */
	setMultipleValue(payload) {
		return this._callAction('setMultiple', payload);
	}

	/**
     * Reset reducer to default values
     * @returns {Function}
     */
	clear() {
		return this._callAction('clear');
	}

	/**
     * Reset only one field in reducer to default values
     * @param {String} field
     * @returns {Function}
     */
	clearByField(field) {
		return this._callAction('clearByField', { field });
	}

	/**
     * Wrapper for loading
     * @param {Array|string|Function} loadingPath Loading path in store
     * @param {Function} func Function for call
     * @returns {function(*=): Promise<any>}
     */
	loadingMiddleware(loadingPath, func) {
		if (!func && typeof loadingPath === 'function') {
			func = loadingPath;
			loadingPath = ['loading'];
		}

		if (typeof loadingPath === 'string') {
			loadingPath = [loadingPath];
		}

		return (dispatch) => new Promise((resolve, reject) => {
			clearTimeout(this.loadingTimeout);
			this.loadingTimeout = setTimeout(() => {
				dispatch(this.setValue(loadingPath, true));
			}, 500);

			func().then((data) => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			}).finally(() => {
				dispatch(this.setValue(loadingPath, false));
				clearTimeout(this.loadingTimeout);
			});
		});
	}

	/**
     * Is exist reducer
     * @returns {boolean}
     * @private
     */
	_isExistReducer() {
		return !!this.reducer || !!this.reducer.actions;
	}

	/**
     * Is exist called reducer action
     * @param {String} name
     * @returns {boolean}
     * @private
     */
	_isExistAction(name) {
		return !!this.reducer.actions[name];
	}

	/**
     * Call reducer action
     * @param {String} action
     * @param payload
     * @returns {Function}
     * @private
     */
	_callAction(action, payload = undefined) {
		if (!this._isExistReducer()) {
			throw new Error('Reducer not found');
		}

		if (!this._isExistAction(action)) {
			throw new Error(`Action "${action}" in reducer not found`);
		}
		return (dispatch) => {
			dispatch(this.reducer.actions[action](payload));
		};
	}

}
