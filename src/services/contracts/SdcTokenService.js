import abi from '../../../abi/sdcToken.json';
import { TOKEN_ADDRESS } from '../../constants/CurrencyConstants';
import BaseTokenService from './BaseTokenService';

class SdcTokenService extends BaseTokenService {

	constructor() {
		super(TOKEN_ADDRESS.SDC, abi);
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
