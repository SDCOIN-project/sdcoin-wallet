import { SWAP_GAS } from '../constants/TransactionConstants';
import { SDC, LUV, LUV_EXCHANGE_RATE } from '../constants/CurrencyConstants';
import transactionHistoryActions from './TransactionHistoryActions';

import sdcTokenService from '../services/contracts/SdcTokenService';
import swapService from '../services/contracts/SwapService';
import ethService from '../services/EthService';
import exchangeSdcOrLuv from '../helpers/ExchangeRateHelper';

class ExchangeTransactionActions {

	/**
	 * Estimate gas for exchange transaction
	 * @param {string} value
	 * @returns {object}
	 */
	exchangeEstimateGas(value) {
		return async (_, getState) => {
			const from = getState().account.get('address');
			const approve = await sdcTokenService.approveEstimateGas(from, value);

			return { approve, swap: SWAP_GAS };
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
		return async (dispatch, getState) => {
			const from = getState().account.get('address');

			const nonce = await ethService.eth.getTransactionCount(from);
			const approve = await sdcTokenService.approve(from, value, approveGas, gasPrice, nonce);
			const swap = await swapService.swap(from, swapGas, gasPrice, nonce + 1);

			const sdcExchangeRate = parseInt(await swapService.getSdcExchangeRate(), 10);
			const luv = exchangeSdcOrLuv(SDC, value, sdcExchangeRate, LUV_EXCHANGE_RATE);

			dispatch(transactionHistoryActions.addPendingTransaction({
				currency: SDC,
				from,
				to: from,
				hash: approve,
				value,
			}));

			dispatch(transactionHistoryActions.addPendingTransaction({
				currency: LUV,
				from,
				to: from,
				hash: swap,
				value: luv,
			}));
		};
	}

}

const exchangeTransactionActions = new ExchangeTransactionActions();
export default exchangeTransactionActions;
