import ethService from '../EthService';

import abi from '../../../abi/sdcToken.json';

class SdcTokenService {

	get contract() {
		return ethService.eth.contract(abi).at(__APP_CONTRACT_SDC_TOKEN__);
	}

}

const sdcTokenService = new SdcTokenService();
export default sdcTokenService;
