import BN from 'bignumber.js';
import web3Service from '../services/Web3Service';
import { SDC } from '../constants/CurrencyConstants';

export const exchangeSdcOrLuv = (from, amount, sdcExchangeRate, luvExchangeRate) => {
	if (!amount) {
		return amount;
	}

	const fromRate = from === SDC ? sdcExchangeRate : luvExchangeRate;
	const toRate = from === SDC ? luvExchangeRate : sdcExchangeRate;

	return new BN(amount).multipliedBy(fromRate).dividedBy(toRate).toString(10);
};

export const calculateRemainMoney = (balance, amount = 0, fee = 0) => {
	if (fee) {
		fee = web3Service.fromWeiToEther(fee);
	}

	return web3Service.fromWei(balance, 'ether').minus(amount).minus(fee).toString(10);
};
