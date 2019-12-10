import bip39 from 'bip39';
import xor from 'buffer-xor';
import * as bcrypt from 'bcryptjs';
import * as ethUtil from 'ethereumjs-util';
import * as hdKey from 'ethereumjs-wallet/hdkey';
import ethService from './EthService';
import { STORAGE_KEYS } from '../constants/WalletConstants';

class WalletService {

	/**
	 * Generate mnemonic
	 * @returns {*}
	 */
	generateMnemonic() {
		return bip39.generateMnemonic();
	}

	/**
	 * Is valid mnemonic
	 * @param {string} mnemonic
	 * @returns {boolean}
	 */
	isValidMnemonic(mnemonic) {
		return bip39.validateMnemonic(mnemonic);
	}

	/**
	 * Get hash from sha256
	 * @param {any} data
	 * @returns {Buffer}
	 */
	getHash(data) {
		return ethUtil.sha256(data);
	}

	/**
	 * Encrypt or decrypt data from xor
	 * @param {Buffer|string} data
	 * @param {Buffer|Array|string|number} key
	 * @param {string} encoding Parameter identifies the character encoding.  Example 'utf8'.
	 * @return {Buffer}
	 */
	encryptOrDecryptData(data, key, encoding = '') {
		return xor(encoding ? Buffer.from(data, encoding) : data, this.getHash(key));
	}

	/**
	 * Get encrypted account by password and mnemonic
	 * @param {string} password
	 * @param {string} mnemonic
	 * @returns {String}
	 */
	async createWallet(password, mnemonic) {
		const DERIVATION_PATH = "m/44'/60'/0'/0/0";

		const hdWallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
		const wallet = hdWallet.derivePath(DERIVATION_PATH).getWallet();
		const encryptedMnemonic = this.encryptOrDecryptData(mnemonic, password, 'utf8').toString('hex');
		const encryptedPrivateKey = this.encryptOrDecryptData(wallet.getPrivateKey().toString('hex'), password, 'utf8').toString('hex');
		const address = wallet.getAddress().toString('hex');
		localStorage.setItem(STORAGE_KEYS.MNEMONIC, encryptedMnemonic);
		localStorage.setItem(STORAGE_KEYS.PRIVATE_KEY, encryptedPrivateKey);
		localStorage.setItem(STORAGE_KEYS.PIN_HASH, await bcrypt.hash(password, 10));
		localStorage.setItem(STORAGE_KEYS.ADDRESS, address);

		return address;
	}

	validatePin(password) {
		const hash = localStorage.getItem(STORAGE_KEYS.PIN_HASH);
		// TODO we should use async method
		return bcrypt.compareSync(password, hash);
	}

	isAuthorized() {
		return localStorage.getItem(STORAGE_KEYS.ADDRESS);
	}

	unlock(pinCode) {
		if (!this.validatePin(pinCode)) {
			return false;
		}
		const encryptedPrivateKey = localStorage.getItem(STORAGE_KEYS.PRIVATE_KEY);
		const privateKey = this.encryptOrDecryptData(encryptedPrivateKey, pinCode, 'hex').toString('utf8');
		ethService.eth.accounts.wallet.add(`0x${privateKey}`);
		return true;
	}

	lock() {
		ethService.eth.accounts.wallet.clear();
	}

	clearFull() {
		this.lock();
		localStorage.removeItem(STORAGE_KEYS.MNEMONIC);
		localStorage.removeItem(STORAGE_KEYS.PRIVATE_KEY);
		localStorage.removeItem(STORAGE_KEYS.PIN_HASH);
		localStorage.removeItem(STORAGE_KEYS.ADDRESS);
	}

}

const walletService = new WalletService();
export default walletService;
