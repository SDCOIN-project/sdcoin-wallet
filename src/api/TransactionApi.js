/* eslint-disable import/prefer-default-export,no-undef */
import { get } from '../utils/Api';

/**
 * Get transactions history
 * @param {string} address
 * @param {object} params
 * @param {string} params.currencyType
 * @param {number} params.start
 * @param {number} params.count
 * @returns {Promise<any>}
 */
export const getTransactions = (address, params) => new Promise((resolve, reject) => {
	get(`${__API_URL__}/api/v1/transactions/${address}`, params).then((data) => {
		resolve(data);
	}).catch((error) => {
		reject(error);
	});
});
