import bip39 from 'bip39';
import xor from 'buffer-xor';
// import * as ethUtil from 'ethereumjs-util';

import * as ethWallet from 'ethereumjs-wallet';
import * as hdKey from 'ethereumjs-wallet/hdkey';

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
	getHash(/* data */) {
		// return ethUtil.sha256(data);
	}

	/**
	 * @param {Buffer} privateKey
	 * @param {Buffer | Array | string | number} key
	 * @return {Buffer}
	 */
	encryptOrDecryptPrivateKey(privateKey, key) {
		return xor(privateKey, this.getHash(key));
	}

	/**
	 * Get encrypted private key by password and mnemonic
	 * @param {string} password
	 * @param  {string} mnemonic
	 * @returns {{encryptedPrivateKey: string, checkSum: string}}
	 */
	getEncryptedPrivateKey(password, mnemonic) {
		const DERIVATION_PATH = "m/0'/0'/0'/0";

		const hdWallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
		const wallet = hdWallet.derivePath(DERIVATION_PATH).getWallet();

		const privateKey = wallet.getPrivateKey();
		const encryptedPrivateKey = this.encryptOrDecryptPrivateKey(privateKey, password).toString('hex');

		const checkSum = this.getHash(privateKey).toString('hex');
		const address = this.getAddress(privateKey);

		return { encryptedPrivateKey, checkSum, address };
	}

	/**
	 * Get private key in Buffer from encrypted private key
	 * @param {string} encryptedPrivateKey
	 * @param {string} password
	 * @returns {Buffer}
	 */
	getPrivateKeyInBuffer(encryptedPrivateKey, password) {
		const encryptedPrivateKeyBuffer = Buffer.from(encryptedPrivateKey, 'hex');
		return this.encryptOrDecryptPrivateKey(encryptedPrivateKeyBuffer, password);
	}

	/**
	 * Compare private key in Buffer with checkSum
	 * @param {Buffer} privateKey
	 * @param {string} checkSum
	 * @returns {boolean}
	 */
	comparePrivateKeyWithCheckSum(privateKey, checkSum) {
		return this.getHash(privateKey).toString('hex') === checkSum;
	}

	/**
	 * Get address from private key
	 * @param {Buffer} privateKey
	 * @returns {string}
	 */
	getAddress(privateKey) {
		const wallet = ethWallet.fromPrivateKey(privateKey);
		return `0x${wallet.getAddress().toString('hex')}`;
	}

}

const walletService = new WalletService();
export default walletService;
