import { post } from '../utils/Api';
import { BACKEND_API_URL } from '../constants/ConfigConstants';

class BackendService {

	async proxyPayment(from, escrow, sig) {
		return post(`${BACKEND_API_URL}/transactions/proxy`, {
			from,
			escrow,
			sig,
		}, {});
	}

}

const backendService = new BackendService();
export default backendService;
