import { Client } from 'cryptoapi-lib';
import { CRYPTO_API_TOKEN, CRYPTO_API_URL } from '../constants/ConfigConstants';
import { ETH, TOKEN_ADDRESS } from '../constants/CurrencyConstants';
import { get } from '../utils/Api';

class CryptoApiService {

	constructor() {
		this.cryptoapiClient = null;
	}

	/**
	 * @returns {Client}
	 */
	get client() {
		if (!this.cryptoapiClient) {
			this.cryptoapiClient = new Client(CRYPTO_API_TOKEN, { eth: { baseUrl: CRYPTO_API_URL } });
			this.subscribeToBlocks(() => {});
		}
		return this.cryptoapiClient;
	}

	async getTransfers(currency, address, skip, limit) {
		if (currency === ETH) {
			return this.getEthTransactions(address, skip, limit);
		}
		return this.getTokenTransfers(TOKEN_ADDRESS[currency], address, skip, limit);
	}

	async getEthTransactions(address, skip, limit) {
		return this.client.api.eth.getTransactionsByAddresses([address], false, { skip, limit });
	}

	async getTokenTransfers(token, address, skip, limit) {
		return this.client.api.eth.getTokenTransfers(token, [address], { skip, limit });
	}

	async getFullTx(hash) {
		return get(`${CRYPTO_API_URL}/coins/eth/transactions/${hash}`, {
			token: CRYPTO_API_TOKEN,
		}, {});
	}

	/**
	 * Subscribe to transactions on or from address
	 * returns subscription id
	 * @param {string} address
	 * @param {function} cb
	 * @returns {Promise<string | number>}
	 */
	async subscribeToTransactions(address, cb) {
		// TODO: use setTimeout to avoid Disconnected error
		return new Promise((resolve) => {
			setTimeout(async () => {
				const id = await this.client.events.eth.onAddressTransactions({
					address,
					confirmations: 0,
				}, (msg) => cb(msg));
				resolve(id);
			}, 3000);
		});
	}

	/**
	 * Subscribe to token transfers on or from address
	 * returns subscription id
	 * @param {string} token
	 * @param {string} address
	 * @param {function} cb
	 * @returns {Promise<string | number>}
	 */
	async subscribeToTokenTransfers(token, address, cb) {
		// TODO: use setTimeout to avoid Disconnected error
		return new Promise((resolve) => {
			setTimeout(async () => {
				const id = await this.client.events.eth.onTokenTransfers({
					token,
					address,
					confirmations: 0,
				}, (msg) => cb(msg));
				resolve(id);
			}, 3000);
		});
	}

	/**
	 * Subscribe to new blocks
	 * returns subscription id
	 * @param {function} cb
	 * @returns {Promise<string | number>}
	 */
	async subscribeToBlocks(cb) {
		// TODO: use setTimeout to avoid Disconnected error
		return new Promise((resolve) => {
			setTimeout(async () => {
				const id = await this.client.events.eth.onBlock(0, (msg) => cb(msg));
				resolve(id);
			}, 3000);
		});
	}

}

const cryptoApiService = new CryptoApiService();
export default cryptoApiService;
