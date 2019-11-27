import { CURRENCY_NOT_FOUND } from '../constants/ErrorConstants';
import { CURRENCY_SERVICES } from '../constants/CurrencyConstants';

class SendTransactionsActions {

	/**
	 * Transfer amount for currencies ETH, SDC, LUV
	 * @param {Object} values
	 * @param {string} values.currency
	 * @param {string} values.to
	 * @param {string} values.value
	 * @returns {*|{estimateGas: (function(*): (*|Promise<number>|Promise<BigNumber>|Promise<number>|Promise<BigNumber>)), send: (function(*): (PromiEvent<TransactionReceipt> | Promise<TransactionResponse> | Promise<string>))}}
	 */
	transfer(values) {
		const { currency, to, value } = values;

		const service = CURRENCY_SERVICES[currency];
		if (!service) {
			throw new Error(CURRENCY_NOT_FOUND);
		}

		return service.transfer(to, value);
	}

	/**
	 * Estimate gas for method transfer
	 * @param {string} currency
	 * @returns {function(*, *): (*|Promise<number>|Promise<BigNumber>)}
	 */
	transferEstimateGas(currency) {
		return async (_, getState) => {
			const from = getState().account.get('address');

			return this.transfer({ currency, to: from, value: 0 }).estimateGas({ from });
		};
	}

	/**
	 * Send for method transfer
	 * @param values
	 * @returns {function(*, *)}
	 */
	transferSend(values) {
		return async (_, getState) => {
			const from = getState().account.get('address');
			const {
				address: to, amount: value, currency, gas, gasPrice,
			} = values;

			const params = { from, gas, gasPrice };
			return this.transfer({ currency, to, value }).send({ ...params });
		};
	}

}

const sendTransactionsActions = new SendTransactionsActions();
export default sendTransactionsActions;
