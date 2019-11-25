/* eslint-disable no-underscore-dangle */
import ethService from '../EthService';

import abi from '../../../abi/sdcToken.json';

class SdcTokenService {

	constructor() {
		this._contract = null;
	}

	get contract() {
		if (!this._contract) {
			this._contract = new ethService.eth.Contract(abi, __APP_CONTRACT_SDC_TOKEN__);
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
	 * @returns {Promise<number>}
	 */
	async getDecimals() {
		return parseInt(await this.contract.methods.decimals().call(), 10);
	}

	transfer(to, value) {
		return this.contract.methods.transfer(to, value);
	}


}

const sdcTokenService = new SdcTokenService();
export default sdcTokenService;
