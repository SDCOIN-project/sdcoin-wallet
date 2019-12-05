import BaseActions from './BaseActions';
import escrowFactoryService from '../services/contracts/EscrowFactoryService';
import luvTokenService from '../services/contracts/LuvTokenService';
import EscrowReducer from '../reducers/EscrowReducer';
import notificationActions from './NotificationActions';
import { CONTRACT_ESCROW_FACTORY } from '../constants/ContractConstants';
import cryptoApiService from '../services/CryptoApiService';
import escrowService from '../services/contracts/EscrowService';

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
				dispatch(notificationActions.getPaymentNotification());
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

}

const escrowActions = new EscrowActions(EscrowReducer);
export default escrowActions;

