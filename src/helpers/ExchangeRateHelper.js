import BN from 'bignumber.js';
import { SDC } from '../constants/CurrencyConstants';

export default (from, amount, sdcExchangeRate, luvExchangeRate) => {
	if (!amount) {
		return amount;
	}

	const fromRate = from === SDC ? sdcExchangeRate : luvExchangeRate;
	const toRate = from === SDC ? luvExchangeRate : sdcExchangeRate;

	return new BN(amount).multipliedBy(fromRate).dividedBy(toRate).toString(10);
};
