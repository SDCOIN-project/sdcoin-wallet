import abi from '../../../abi/luvToken.json';
import BaseTokenService from './BaseTokenService';
import { TOKEN_ADDRESS } from '../../constants/CurrencyConstants';

class LuvTokenService extends BaseTokenService {

	constructor() {
		super(TOKEN_ADDRESS.LUV, abi);
	}

}

const luvTokenService = new LuvTokenService();
export default luvTokenService;
