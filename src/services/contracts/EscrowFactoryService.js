import ethService from '../EthService';

import abi from '../../../abi/escrowFactory.json';
import EscrowReducer from '../../reducers/EscrowReducer';
import { CONTRACT_ESCROW_FACTORY } from '../../constants/ContractConstants';

class EscrowFactoryService {

	constructor() {
		this.contract = new ethService.eth.Contract(abi, CONTRACT_ESCROW_FACTORY);
	}

	/**
	 * Get account mapped escrow contracts
	 * @param {string} address
	 * @returns {Promise<*[]>}
	 */
	async getEscrowList(address) {
		const count = parseInt(await this.contract.methods.getCountEscrowContracts(address).call(), 10);
		return Promise.all([...Array(count)].map((_, i) => this.contract.methods.getEscrowContract(address, i).call()));
	}

}

const escrowFactoryService = new EscrowFactoryService(EscrowReducer);
export default escrowFactoryService;
