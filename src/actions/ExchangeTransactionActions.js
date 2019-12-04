import { CURRENCY_NOT_FOUND } from '../constants/ErrorConstants';
import { CURRENCY_SERVICES, SDC } from '../constants/CurrencyConstants';
import swapService from '../services/contracts/SwapService';

class ExchangeTransactionActions {

	/**
	 * Allow swap contract to manipulate tokens for currencies ETH, SDC, LUV
	 * @param {string} currency
	 * @param {string} spender
	 * @param {string} value
	 * @returns {*|{estimateGas: (function(*): (*|Promise<number>|Promise<BigNumber>|Promise<number>|Promise<BigNumber>)), send: (function(*): (PromiEvent<TransactionReceipt> | Promise<TransactionResponse> | Promise<string>))}}
	 */
	approve({ currency, spender, value }) {

		const service = CURRENCY_SERVICES[currency];
		if (!service) {
			throw new Error(CURRENCY_NOT_FOUND);
		}

		return service.approve(spender, value);
	}

	/**
	 * Estimate gas for exchange transaction
	 * @param {string} value
	 * @returns {number}
	 */
	exchangeEstimateGas(value) {
		return async (_, getState) => {
			const from = getState().account.get('address');
			const approve = await this.approve({ currency: SDC, spender: __APP_CONTRACT_SWAP__, value }).estimateGas({ from });
			const swap = 66000;

			return { approve, swap };
		};
	}

	/**
	 * Send for exchange transaction
	 * @param {string} value
	 * @param {string} approveGas
	 * @param {string} swapGas
	 * @param {string} gasPrice
	 * @returns {function(*, *): (*|Promise<number>|Promise<BigNumber>)}
	 */
	sdcToLuv({
		value, approveGas, swapGas, gasPrice,
	}) {
		return async (_, getState) => {
			const from = getState().account.get('address');
			await this.approve({ currency: SDC, spender: __APP_CONTRACT_SWAP__, value }).send({ from, gas: approveGas, gasPrice });

			return swapService.swap(from).send({ from, gas: swapGas, gasPrice });
		};
	}

}

const exchangeTransactionActions = new ExchangeTransactionActions();
export default exchangeTransactionActions;
