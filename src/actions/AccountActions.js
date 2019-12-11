import AccountReducer from '../reducers/AccountReducer';
import BaseActions from './BaseActions';
import globalActions from './GlobalActions';
import notificationActions from './NotificationActions';
import transactionHistoryActions from './TransactionHistoryActions';
import scanQrCodeActions from './ScanQrCodeActions';
import touchIdActions from './TouchIdActions';
import escrowActions from './EscrowActions';
import walletService from '../services/WalletService';
import { CURRENCIES, LUV, SDC } from '../constants/CurrencyConstants';
import { CURRENCY_SERVICES } from '../services/CurrencyServices';
import { ICONS } from '../constants/NotificationConstants';
import {
	IMPOSSIBLE_TO_CREATE_WALLET_ERROR,
	AUTHORIZATION_FAILED,
	MNEMONIC_NOT_FOUND,
	INVALID_ETH_RESPONSE,
	NO_INTERNET, TOUCH_ID_CANCELED,
} from '../constants/ErrorConstants';
import modalActions from './ModalActions';

class AccountActions extends BaseActions {

	/**
	 * Create and save encrypted account from password, mnemonic
	 * Set in store encryptedPrivateKey, checkSum, address
	 * @param {string} pinCode
	 * @param {string} mnemonic
	 * @returns {Function}
	 */
	createAndEncryptAccount(pinCode, mnemonic) {
		return async (dispatch) => {
			try {
				if (!pinCode || !walletService.isValidMnemonic(mnemonic)) {
					throw new Error(IMPOSSIBLE_TO_CREATE_WALLET_ERROR);
				}

				const address = await walletService.createWallet(pinCode, mnemonic);

				dispatch(this.authorisation({ address }));
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
		return async (dispatch) => {
			await dispatch(this.createAndEncryptAccount(pinCode, mnemonic));

			dispatch(globalActions.unlock());
		};
	}

	/**
	 * Authorisation account
	 * @param address
	 * @returns {Function}
	 */
	authorisation({ address }) {
		return async (dispatch) => {
			if (!address) {
				throw new Error(AUTHORIZATION_FAILED);
			}

			address = `0x${address}`;

			clearInterval(this.updateBalanceInterval);

			dispatch(this.setValue('address', address));

			dispatch(transactionHistoryActions.getTransactions());
			dispatch(transactionHistoryActions.subscribeToTransactions(address));
			dispatch(transactionHistoryActions.subscribeToTokenTransactions(address, LUV));
			dispatch(transactionHistoryActions.subscribeToTokenTransactions(address, SDC));

			dispatch(this.getBalances());
			await dispatch(escrowActions.bindEscrowList());
			dispatch(escrowActions.bindUnclaimedBalance());
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
				if (error.message === INVALID_ETH_RESPONSE) {
					dispatch(notificationActions.add({
						id: NO_INTERNET,
						icon: ICONS.noInternet,
						text: NO_INTERNET,
						className: 'is-small',
					}));
				} else {
					dispatch(notificationActions.errorNotification({ text: error.message }));
				}
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
			walletService.clearFull();

			clearInterval(this.updateBalanceInterval);
			dispatch(this.clear());
			dispatch(globalActions.clear());
			dispatch(notificationActions.clear());
			dispatch(transactionHistoryActions.clear());
			dispatch(scanQrCodeActions.clear());
			dispatch(touchIdActions.clear());
			dispatch(touchIdActions.disableAltId());
			dispatch(escrowActions.clear());
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
		return walletService.validatePin(pinCode);
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

	unlockWallet(pinCode) {
		return walletService.unlock(pinCode);
	}

	changePin(oldPin, newPinCode) {
		return async (dispatch) => {
			await dispatch(this.createWallet(newPinCode, this.getDecryptedMnemonic(oldPin)));

			try {
				await dispatch(touchIdActions.updatePassword(newPinCode));
			} catch (e) {
				if (e.message === TOUCH_ID_CANCELED) {
					const answer = await dispatch(modalActions.confirmAsync({
						title: 'Are you sure?',
						description: 'Alternative authorization method will be disabled',
						cancelButtonText: 'Disable',
						confirmButtonText: 'Retry',
					}));
					if (answer) {
						await dispatch(this.changePin(oldPin, newPinCode));
						return;
					}
					await dispatch(touchIdActions.disableAltId());
				} else {
					notificationActions.errorNotification({ text: e.message });
					return;
				}
			}

			dispatch(notificationActions.add({ text: 'PIN has been changed successfully', button: 'OK', icon: ICONS.lock }));
		};
	}

}

const accountActions = new AccountActions(AccountReducer);
export default accountActions;

