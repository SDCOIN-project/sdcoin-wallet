import ethService from '../EthService';
import abi from '../../../abi/escrowFactory.json';
import EscrowReducer from '../../reducers/EscrowReducer';
import { CONTRACT_ESCROW_FACTORY, ESCROW_ITEM_ID, ESCROW_ITEMS_AMOUNT } from '../../constants/ContractConstants';
import web3Service from '../Web3Service';
import { ETH_AMOUNT_TO_ESCROW_CREATE } from '../../constants/GlobalConstants';

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

	/**
	 * Create new escrow contract
	 * @param {number} price
	 * @param from
	 * @param gas
	 * @param gasPrice
	 * @returns {Promise<id>}
	 */
	createEscrowContract(price, from, gas, gasPrice) {
		return new Promise((resolve, reject) => {
			this.contract.methods.create(ESCROW_ITEM_ID, price, ESCROW_ITEMS_AMOUNT).send({
				ESCROW_ITEM_ID, price, ESCROW_ITEMS_AMOUNT, from, gas, gasPrice, value: web3Service.toWei(ETH_AMOUNT_TO_ESCROW_CREATE),
			}, (err, res) => (err ? reject(err) : resolve(res)));
		});
	}

	/**
	 * Estimate gas for create new escrow contract
	 * @param {number} id
	 * @param {number} price
	 * @param {number} amount
	 * @param from
	 * @returns {*}
	 */
	createEscrowContractEstimateGas(id, price, amount, from) {
		return new Promise((resolve) => {
			try {
				this.contract.methods.create(id, price, amount).estimateGas({ from }, (err, res) => {
					if (err) { resolve(0); } else { resolve(res); }
				});
			} catch (error) {
				resolve(0);
			}
		});
	}

}

const escrowFactoryService = new EscrowFactoryService(EscrowReducer);
export default escrowFactoryService;
