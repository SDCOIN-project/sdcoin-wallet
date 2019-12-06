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

	/**
	 * Allow swap contract to manipulate tokens for currencies ETH, SDC, LUV
	 * @param {string} currency
	 * @param {string} spender
	 * @param {string} value
	 * @returns {*|{estimateGas: (function(*): (*|Promise<number>|Promise<BigNumber>|Promise<number>|Promise<BigNumber>)), send: (function(*): (PromiEvent<TransactionReceipt> | Promise<TransactionResponse> | Promise<string>))}}
	 */
	approve(from, value, gas, gasPrice, nonce) {
		return new Promise((resolve, reject) => {
			this.contract.methods.approve(__APP_CONTRACT_SWAP__, value).send({
				from, gas, gasPrice, nonce,
			}, (err, res) => (res ? resolve(res) : reject(err)));
		});
	}

	/**
	 * Estimate gas for approve transaction
	 * @param {string} value
	 * @returns {number}
	 */
	approveEstimateGas(from, value) {
		return this.contract.methods.approve(__APP_CONTRACT_SWAP__, value).estimateGas({ from });
	}

}

const sdcTokenService = new SdcTokenService();
export default sdcTokenService;
