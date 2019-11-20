/* eslint-disable no-underscore-dangle */
import ethService from '../EthService';

import abi from '../../../abi/luvToken.json';

class LuvTokenService {

	constructor() {
		this._contract = null;
	}

	get contract() {
		if (!this._contract) {
			this._contract = new ethService.eth.Contract(abi, __APP_CONTRACT_LUV_TOKEN__);
		}

		return this._contract;
	}

	/**
	 * Get balance
	 * @param {string} address
	 * @returns {Promise<string>}
	 */
	async getBalance(address) {
		return this.contract.methods.balanceOf(address).call();
	}

	/**
	 * Get decimals
	 * @returns {Promise<string>}
	 */
	async getDecimals() {
		return parseInt(await this.contract.methods.decimals().call(), 10);
	}

}

const luvTokenService = new LuvTokenService();
export default luvTokenService;
