import axios from 'axios';
import qs from 'qs';

import 'core-js/es6/string';
import 'core-js/es6/number';
import 'core-js/es6/array';
import 'core-js/es7/array';

require('es6-promise').polyfill();
require('es6-object-assign').polyfill();

const DEFAULT_OPTIONS = { withCredentials: true };

const parseError = (error) => {
	let status;
	let message = '';
	let data = {};

	if (typeof error === 'object') {
		if (error.message) {
			({ message } = error);
		} else if (error.response) {
			({ status, statusText: message, data } = error.response);
		}
	}

	if (typeof error === 'string') {
		message = error;
	}

	return { status, message, data };
};

/**
 * Execute all requests
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
function executeRequest(method, url, data, options = DEFAULT_OPTIONS) {

	const params = [
		url,
		...data ? [data] : [],
		options,
	];

	return new Promise((resolve, reject) => {
		axios[method](...params).then((response) => {
			resolve(response.data);
		}).catch(({ response }) => {
			reject(parseError(response));
		});
	});
}

/**
 * Get method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function get(url, data, options) {
	const query = qs.stringify(data);
	return executeRequest('get', `${url}?${query || ''}`, null, options);
}

/**
 * Post method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function post(url, data, options) {
	// if need upload file use this post
	return executeRequest('post', `${url}`, data, options);
}

/**
 * Patch method
 * @param {String}url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function patch(url, data, options) {
	return executeRequest('patch', `${url}`, data, options);
}

/**
 * Put method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function put(url, data, options) {
	return executeRequest('put', `${url}`, data, options);
}


/**
 * Delete method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function del(url, data, options) {
	return executeRequest('delete', `${url}`, data, options);
}
