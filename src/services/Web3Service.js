/* eslint-disable no-underscore-dangle */
import Web3 from 'web3';
import BN from 'bignumber.js';

import { WEB3_IS_UNAVAILABLE_ERROR } from '../constants/ErrorConstants';

class Web3Service {

	constructor() {
		this._web3 = null;
	}

	/**
	 * Get web3 instance
	 */
	init() {
		const provider = new Web3.providers.HttpProvider(__APP_NETWORK_URL__);

		this._web3 = new Web3(provider);
		if (!this._web3) {
			throw new Error(WEB3_IS_UNAVAILABLE_ERROR);
		}
	}

	get web3() {
		if (!this._web3) {
			throw new Error(WEB3_IS_UNAVAILABLE_ERROR);
		}
		return this._web3;
	}

	/**
	 * Amount to WEI
	 * @param {BigNumber} amount
	 * @param {string} rate
	 * @returns {BigNumber}
	 */
	toWei(amount, rate) {
		return new BN(this.web3.utils.toWei(amount, rate));
	}

	/**
	 * Amount from WEI
	 * @param {BigNumber|string} amount
	 * @param {string} rate
	 * @returns {BigNumber}
	 */
	fromWei(amount, rate) {
		return new BN(this.web3.utils.fromWei(amount, rate));
	}

	/**
	 * Value to hex
	 * @param {String|Number|Object|Array|BigNumber} amount
	 * @returns {String}
	 */
	toHex(amount) {
		return this.web3.utils.toHex(amount);
	}

}

const web3Service = new Web3Service();
export default web3Service;
