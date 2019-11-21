import AccountReducer from '../reducers/AccountReducer';
import BaseActions from './BaseActions';

import walletService from '../services/WalletService';

import ethService from '../services/EthService';
import sdcTokenService from '../services/contracts/SdcTokenService';
import luvTokenService from '../services/contracts/LuvTokenService';

import { IMPOSSIBLE_TO_CREATE_WALLET_ERROR, AUTHORIZATION_FAILED } from '../constants/ErrorConstants';
import { ETH, SDC, LUV } from '../constants/CurrencyConstants';

class AccountActions extends BaseActions {

	/**
	 * Create and save encrypted private key from password, mnemonic
	 * Set in store encryptedPrivateKey, checkSum, address
	 * @param {string} pinCode
	 * @param {string} mnemonic
	 * @returns {Function}
	 */
	createAndEncryptPrivateKey(pinCode, mnemonic) {
		return (dispatch) => {
			try {
				if (!pinCode || !walletService.isValidMnemonic(mnemonic)) {
					throw new Error(IMPOSSIBLE_TO_CREATE_WALLET_ERROR);
				}

				const { checkSum, encryptedPrivateKey, address } = walletService.getEncryptedPrivateKey(pinCode, mnemonic);

				localStorage.setItem('checkSum', checkSum);
				localStorage.setItem('encryptedPrivateKey', encryptedPrivateKey);
				localStorage.setItem('address', address);

				dispatch(this.authorisation({ address }));
			} catch (error) {
				alert(error.message);
				throw error;
			}
		};
	}

	/**
	 * Create wallet by password and mnemonic
	 * Set in store encryptedPrivateKey, checkSum, address
	 * @param {string} pinCode
	 * @param {string} mnemonic
	 * @returns {Function}
	 */
	createWallet(pinCode, mnemonic) {
		return (dispatch) => {
			dispatch(this.createAndEncryptPrivateKey(pinCode, mnemonic));
		};
	}

	/**
	 * Authorisation account
	 * @param address
	 * @returns {Function}
	 */
	authorisation({ address }) {
		return (dispatch) => {
			if (!address) {
				throw new Error(AUTHORIZATION_FAILED);
			}

			clearInterval(this.updateBalanceInterval);

			dispatch(this.setValue('address', address));

			dispatch(this.getBalances());
			this.updateBalanceInterval = setInterval(() => {
				dispatch(this.getBalances());
			}, 30 * 1000);
		};
	}

	/**
	 * Get balances and set their to store
	 * @returns {Function}
	 */
	getBalances() {
		return async (dispatch, getState) => {
			const address = getState().account.get('address');
			try {
				const currencies = {
					[ETH]: ethService,
					[SDC]: sdcTokenService,
					[LUV]: luvTokenService,
				};

				const balances = await Promise.all(Object.keys(currencies).map((currency) => {
					const service = currencies[currency];
					return service.getBalance(address);
				}));

				Object.keys(currencies).forEach((currency, index) => {
					dispatch(this.setValue(['balances', currency], balances[index]));
				});
			} catch (error) {
				alert(error.message);
				throw error;
			}
		};
	}

	/**
	 * Logout from account
	 * @returns {Function}
	 */
	logout() {
		return (dispatch) => {
			localStorage.removeItem('checkSum');
			localStorage.removeItem('encryptedPrivateKey');
			localStorage.removeItem('address');

			clearInterval(this.updateBalanceInterval);
			dispatch(this.clear());
		};
	}

}

const accountActions = new AccountActions(AccountReducer);
export default accountActions;

