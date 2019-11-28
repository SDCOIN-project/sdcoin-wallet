import AccountReducer from '../reducers/AccountReducer';
import BaseActions from './BaseActions';

import walletService from '../services/WalletService';

import ethService from '../services/EthService';

import { IMPOSSIBLE_TO_CREATE_WALLET_ERROR, AUTHORIZATION_FAILED, MNEMONIC_NOT_FOUND } from '../constants/ErrorConstants';
import { CURRENCY_SERVICES, CURRENCIES } from '../constants/CurrencyConstants';
import notificationActions from './NotificationActions';

class AccountActions extends BaseActions {

	/**
	 * Create and save encrypted account from password, mnemonic
	 * Set in store encryptedPrivateKey, checkSum, address
	 * @param {string} pinCode
	 * @param {string} mnemonic
	 * @returns {Function}
	 */
	createAndEncryptAccount(pinCode, mnemonic) {
		return (dispatch) => {
			try {
				if (!pinCode || !walletService.isValidMnemonic(mnemonic)) {
					throw new Error(IMPOSSIBLE_TO_CREATE_WALLET_ERROR);
				}

				const encryptedAccount = walletService.getEncryptedAccount(pinCode, mnemonic);
				const encryptedMnemonic = walletService.encryptOrDecryptData(mnemonic, pinCode, 'utf8').toString('hex');

				localStorage.setItem('encryptedMnemonic', encryptedMnemonic);
				localStorage.setItem('account', JSON.stringify(encryptedAccount));

				dispatch(this.authorisation({ address: encryptedAccount.address }));
			} catch (error) {
				dispatch(notificationActions.errorNotification({ text: error.message }));
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
			dispatch(this.createAndEncryptAccount(pinCode, mnemonic));
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

			dispatch(this.setValue('address', `0x${address}`));

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
				const balances = await Promise.all(Object.keys(CURRENCY_SERVICES).map((currency) => {
					const service = CURRENCY_SERVICES[currency];
					return service.getBalance(address);
				}));

				Object.keys(CURRENCY_SERVICES).forEach((currency, index) => {
					dispatch(this.setValue(['balances', currency], balances[index]));
				});
			} catch (error) {
				dispatch(notificationActions.errorNotification({ text: error.message }));
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
			localStorage.removeItem('encryptedMnemonic');
			localStorage.removeItem('account');

			clearInterval(this.updateBalanceInterval);
			dispatch(this.clear());
		};
	}

	/**
	 * Set selected currency
	 * @param {string} selectedCurrency
	 * @returns {Function}
	 */
	setSelectedCurrency(selectedCurrency) {
		return (dispatch) => {
			if (!CURRENCIES.includes(selectedCurrency)) return;
			dispatch(this.setValue('selectedCurrency', selectedCurrency));
		};
	}

	/**
	 * Validate pin code
	 * @param {string} pinCode
	 * @returns {boolean}
	 */
	validatePinCode(pinCode) {
		const account = JSON.parse(localStorage.getItem('account'));
		return !!ethService.accountDecrypt(account, pinCode);
	}

	/**
	 * Decrypt mnemonic
	 * @param {string} encryptedMnemonic
	 * @param {string} pinCode
	 * @returns {string}
	 */
	decryptMnemonic(encryptedMnemonic, pinCode) {
		return walletService.encryptOrDecryptData(encryptedMnemonic, pinCode, 'hex').toString('utf8');
	}

	getDecryptedMnemonic(pinCode) {
		const mnemonic = localStorage.getItem('encryptedMnemonic');
		if (!mnemonic) {
			throw new Error(MNEMONIC_NOT_FOUND);
		}

		return this.decryptMnemonic(mnemonic, pinCode);
	}

	decryptAndWalletAdd(pinCode) {
		return ethService.decryptAndWalletAdd(JSON.parse(localStorage.getItem('account')), pinCode);
	}


}

const accountActions = new AccountActions(AccountReducer);
export default accountActions;

