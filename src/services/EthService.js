import web3Service from './Web3Service';

import { ETH_IS_UNAVAILABLE_ERROR } from '../constants/ErrorConstants';

class EthService {

	get eth() {
		if (!web3Service.web3.eth) {
			throw new Error(ETH_IS_UNAVAILABLE_ERROR);
		}
		return web3Service.web3.eth;
	}

}

const ethService = new EthService();
export default ethService;
