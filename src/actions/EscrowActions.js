import BaseActions from './BaseActions';
import escrowFactoryService from '../services/contracts/EscrowFactoryService';
import luvTokenService from '../services/contracts/LuvTokenService';
import EscrowReducer from '../reducers/EscrowReducer';
import notificationActions from './NotificationActions';
import { CONTRACT_ESCROW_FACTORY, ESCROW_ITEM_ID, ESCROW_ITEMS_AMOUNT } from '../constants/ContractConstants';
import cryptoApiService from '../services/CryptoApiService';
import escrowService from '../services/contracts/EscrowService';
import sdcTokenService from '../services/contracts/SdcTokenService';
import web3Service from '../services/Web3Service';
import backendService from '../services/BackendService';

class EscrowActions extends BaseActions {

	/**
	 * Binds all account escrow accounts
	 * @returns {function(...[*]=)}
	 */
	bindEscrowList() {
		return async (dispatch, getState) => {
			const address = getState().account.get('address');
			const list = await escrowFactoryService.getEscrowList(address);
			const contracts = getState().escrow.get('contracts').toJS();
			await Promise.all(list.map(async (contractAddress) => {
				if (!contracts[contractAddress]) {
					contracts[contractAddress] = await cryptoApiService.subscribeToTransactions(contractAddress, () => {
						dispatch(this.bindUnclaimedBalance());
					});
				}
			}));
			dispatch(this.setValue('contracts', contracts));
		};
	}

	/**
	 * Get balances from all account escrow contracts and bind sum to the state
	 * @returns {function(...[*]=)}
	 */
	bindUnclaimedBalance() {
		return async (dispatch, getState) => {
			const addresses = getState().escrow.get('contracts').toJS();
			const result = await Promise.all(Object.keys(addresses).map(async (address) => parseInt(await luvTokenService.getBalance(address), 10)));
			const sum = result.reduce((a, b) => a + b, 0);
			dispatch(this.setValue('unclaimedBalance', sum));
			if (sum) {
				const notificationId = dispatch(notificationActions.getPaymentNotification());
				dispatch(this.setValue('unclaimedBalanceNotifyId', notificationId));
			}
		};
	}

	/**
	 * After new tx receiving we should check if this tx is to escrow factory
	 * we should rebind escrow contracts list
	 * @param {object} tx
	 * @returns {function(...[*]=)}
	 */
	checkIsTxToEscrowFactory(tx) {
		return async (dispatch) => {
			if (tx.to === CONTRACT_ESCROW_FACTORY) {
				await dispatch(this.bindEscrowList());
			}
		};
	}

	withdrawEstimateGas(contract) {
		return async (_, getState) => {
			const address = getState().account.get('address');
			return escrowService.withdrawEstimateGas(contract, address);
		};
	}

	withdraw(contract) {
		return async (_, getState) => {
			const address = getState().account.get('address');
			return escrowService.withdraw(contract, address);
		};
	}

	createEscrowContract(price, gas, gasPrice) {
		return async (_, getState) => {
			const from = getState().account.get('address');
			const result = await escrowFactoryService.createEscrowContract(price, from, gas, gasPrice);
			// TODO: Add result TX hash to pending transactions array
			return result;
		};
	}

	/**
	 * Estimate gas for create escrow contract
	 * @param {number} price
	 * @returns {number}
	 */
	createEscrowContractEstimateGas(price) {
		return (_, getState) => {
			const from = getState().account.get('address');
			return escrowFactoryService.createEscrowContractEstimateGas(ESCROW_ITEM_ID, price, ESCROW_ITEMS_AMOUNT, from);
		};
	}

	getEscrowPrice(address) {
		return async () => {
			const price = await escrowService.getPrice(address);
			return web3Service.fromWei(price, 'ether').toString(10);
		};
	}

	getEscrowAddressFromCreateTx(hash) {
		return async () => {
			const tx = await cryptoApiService.getFullTx(hash);
			return escrowFactoryService.getEscrowAddressFromTx(tx);
		};
	}

	proxyPayment(escrowAddress) {
		return async (dispatch, getState) => {
			const address = getState().account.get('address');
			const nonce = await sdcTokenService.getNonce(address);
			const hash = await web3Service.signData(address, ['bytes20', 'bytes20', 'uint256'], [address, escrowAddress, nonce]);
			await backendService.proxyPayment(address, escrowAddress, hash);
		};
	}

}

const escrowActions = new EscrowActions(EscrowReducer);
export default escrowActions;

