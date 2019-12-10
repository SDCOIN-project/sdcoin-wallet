import web3Service from './Web3Service';

import { ETH_IS_UNAVAILABLE_ERROR } from '../constants/ErrorConstants';

class EthService {

	get eth() {
		if (!web3Service.web3.eth) {
			throw new Error(ETH_IS_UNAVAILABLE_ERROR);
		}
		return web3Service.web3.eth;
	}

	/**
	 * Get balance
	 * @param {string} address
	 * @returns {Promise<string>}
	 */
	async getBalance(address) {
		return this.eth.getBalance(address);
	}

	/**
	 * Estimate gas
	 * @param {object} tx
	 * @returns {*|Promise<number>|Promise<BigNumber>}
	 */
	estimateGas(tx) {
		return this.eth.estimateGas(tx);
	}

	/**
	 * Get gas price
	 * @returns {*|Promise<BigNumber>|Promise<string>}
	 */
	getGasPrice() {
		return this.eth.getGasPrice();
	}

	transfer(to, value) {
		return {
			send: (params) => new Promise((resolve, reject) => {
				this.eth.sendTransaction({ to, value, ...params }, (err, res) => (res ? resolve(res) : reject(err)));
			}),
			estimateGas: (params) => this.eth.estimateGas({ to, value, ...params }),
		};
	}

}

const ethService = new EthService();
export default ethService;
