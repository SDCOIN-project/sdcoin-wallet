/* eslint-disable no-underscore-dangle */
import ethService from '../EthService';
import abi from '../../../abi/sdcToken.json';
import { TOKEN_ADDRESS } from '../../constants/CurrencyConstants';

class SdcTokenService {

	constructor() {
		this._contract = null;
	}

	get contract() {
		if (!this._contract) {
			this._contract = new ethService.eth.Contract(abi, TOKEN_ADDRESS.SDC);
		}

		return this._contract;
	}

	get address() {
		return TOKEN_ADDRESS.SDC;
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
	 * @param {string} from
	 * @param {string} value
	 * @returns {number}
	 */
	approveEstimateGas(from, value) {
		return this.contract.methods.approve(__APP_CONTRACT_SWAP__, value).estimateGas({ from });
	}

	async getNonce(account) {
		return parseInt(await this.contract.methods.getNonce(account).call(), 10);
	}

}

const sdcTokenService = new SdcTokenService();
export default sdcTokenService;
