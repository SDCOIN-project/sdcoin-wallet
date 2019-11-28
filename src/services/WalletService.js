import bip39 from 'bip39';
import xor from 'buffer-xor';
import * as ethUtil from 'ethereumjs-util';
import * as hdKey from 'ethereumjs-wallet/hdkey';
import ethService from './EthService';

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
	 * @returns {EncryptedKeystoreV3Json}
	 */
	getEncryptedAccount(password, mnemonic) {
		const DERIVATION_PATH = "m/44'/60'/0'/0/0";

		const hdWallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
		const wallet = hdWallet.derivePath(DERIVATION_PATH).getWallet();

		return ethService.accountEncrypt(`0x${wallet.getPrivateKey().toString('hex')}`, password);
	}

}

const walletService = new WalletService();
export default walletService;
