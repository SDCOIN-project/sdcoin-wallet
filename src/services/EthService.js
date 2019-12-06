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

	/**
	 * Create account from privateKey and encrypt account to keystore Json V3
	 * @param {string} privateKey
	 * @param {string} password
	 * @returns {EncryptedKeystoreV3Json}
	 */
	accountEncrypt(privateKey, password) {
		return this.eth.accounts.encrypt(privateKey, password);
	}

	/**
	 * Decrypt account for keystore Json V3
	 * @param {Object} keystoreJsonV3
	 * @param {string} password
	 * @returns {Account|boolean}
	 */
	accountDecrypt(keystoreJsonV3, password) {
		try {
			return this.eth.accounts.decrypt(keystoreJsonV3, password);
		} catch (error) {
			return false;
		}
	}

	/**
	 * Decrypt keystore Json V3 and add to wallet
	 * @param {Object|[Object]} keystoreJsonV3
	 * @param {string} password
	 * @returns {boolean}
	 */
	decryptAndWalletAdd(keystoreJsonV3, password) {
		try {
			this.eth.accounts.wallet.decrypt(keystoreJsonV3 instanceof Array ? keystoreJsonV3 : [keystoreJsonV3], password);
			return true;
		} catch (error) {
			return false;
		}

	}

	clearWallet() {
		return this.eth.accounts.wallet.clear();
	}

}

const ethService = new EthService();
export default ethService;
