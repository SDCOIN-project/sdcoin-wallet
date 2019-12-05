import BigNumber from 'bignumber.js';
import ethService from '../EthService';

import abi from '../../../abi/escrow.json';

class EscrowService {

	async withdrawEstimateGas(escrow, sender) {
		this.contract = new ethService.eth.Contract(abi, escrow);
		return new BigNumber(await this.contract.methods.withdraw().estimateGas({ from: sender }));
	}

	async withdraw(escrow, sender) {
		this.contract = new ethService.eth.Contract(abi, escrow);
		return new BigNumber(await this.contract.methods.withdraw().send({
			from: sender,
			gas: await this.withdrawEstimateGas(escrow, sender),
		}));
	}

}

const escrowService = new EscrowService();
export default escrowService;
