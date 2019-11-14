import ethService from '../EthService';

import abi from '../../../abi/luvToken.json';

class LuvTokenService {

	get contract() {
		return ethService.eth.contract(abi).at(__APP_CONTRACT_LUV_TOKEN__);
	}

}

const luvTokenService = new LuvTokenService();
export default luvTokenService;
