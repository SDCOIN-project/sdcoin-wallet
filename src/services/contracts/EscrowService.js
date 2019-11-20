/* eslint-disable no-underscore-dangle */
import ethService from '../EthService';

import abi from '../../../abi/escrow.json';

class EscrowService {

	constructor() {
		this._contract = null;
	}

	get contract() {
		if (!this._contract) {
			this._contract = new ethService.eth.Contract(abi, __APP_CONTRACT_ESCROW__);
		}

		return this._contract;
	}

}

const escrowService = new EscrowService();
export default escrowService;
