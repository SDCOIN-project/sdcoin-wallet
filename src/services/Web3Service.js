/* eslint-disable no-underscore-dangle */
import Web3 from 'web3';
import BN from 'bignumber.js';

class Web3Service {

	constructor() {
		this._web3 = null;
	}

	get web3() {
		if (!this._web3) {
			const provider = new Web3.providers.HttpProvider(__APP_NETWORK_URL__);
			this._web3 = new Web3(provider);
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
	 * Convert amount from wei to ether
	 * @param {BigNumber|string} amount
	 * @returns {number}
	 */
	fromWeiToEther(amount) {
		return this.fromWei(amount, 'ether').toNumber();
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
