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

	async getPrice(escrow) {
		this.contract = new ethService.eth.Contract(abi, escrow);
		return this.contract.methods.price().call();
	}

	/**
	 * Check if account is owner selected escrow contract
	 * @param {String} account
	 * @param {String} escrow
	 * @return {Promise<boolean>}
	 */
	async checkIsOwner(account, escrow) {
		const contract = new ethService.eth.Contract(abi, escrow);
		return (await contract.methods.owner().call()).toLowerCase() === account.toLowerCase();
	}

}

const escrowService = new EscrowService();
export default escrowService;
