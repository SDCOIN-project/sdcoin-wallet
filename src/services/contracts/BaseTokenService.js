import ethService from '../EthService';

class BaseTokenService {

	constructor(address, abi) {
		this.contract = new ethService.eth.Contract(abi, address);
		this.address = address;
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
		const method = this.contract.methods.transfer(to, value);
		return {
			send: (params) => new Promise((resolve, reject) => {
				method.send(params, (err, res) => (res ? resolve(res) : reject(err)));
			}),
			estimateGas: (params) => method.estimateGas({ to, value, ...params }),
		};
	}

}

export default BaseTokenService;
