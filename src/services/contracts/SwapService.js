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

}

const swapService = new SwapService();
export default swapService;
