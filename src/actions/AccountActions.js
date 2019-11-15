import AccountReducer from '../reducers/AccountReducer';
import BaseActions from './BaseActions';

import web3Service from '../services/Web3Service';
import walletService from '../services/WalletService';

import { IMPOSSIBLE_TO_CREATE_WALLET_ERROR, AUTHORIZATION_FAILED } from '../constants/ErrorConstants';

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
	 * Authorisation  account
	 * @param address
	 * @returns {Function}
	 */
	authorisation({ address }) {
		return (dispatch) => {
			if (!address) {
				throw new Error(AUTHORIZATION_FAILED);
			}

			dispatch(this.setValue('address', address));

			web3Service.init();

			// TODO: here load balance of user
		};
	}

}

const accountActions = new AccountActions(AccountReducer);
export default accountActions;

