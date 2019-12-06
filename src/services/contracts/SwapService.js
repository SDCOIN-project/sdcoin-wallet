/* eslint-disable no-underscore-dangle */
import ethService from '../EthService';

import abi from '../../../abi/swap.json';

class SwapService {

	constructor() {
		this._contract = null;
	}

	get contract() {
		if (!this._contract) {
			this._contract = new ethService.eth.Contract(abi, __APP_CONTRACT_SWAP__);
		}

		return this._contract;
	}

	getSdcExchangeRate() {
		return this.contract.methods.exchangeRate().call();
	}

	swap(from, gas, gasPrice, nonce) {
		return new Promise((resolve, reject) => {
			this.contract.methods.swap(from).send({
				from, gas, gasPrice, nonce,
			}, (err, res) => (res ? resolve(res) : reject(err)));
		});
	}

}

const swapService = new SwapService();
export default swapService;
