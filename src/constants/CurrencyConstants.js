import ethService from '../services/EthService';
import sdcTokenService from '../services/contracts/SdcTokenService';
import luvTokenService from '../services/contracts/LuvTokenService';

export const ETH = 'ETH';
export const SDC = 'SDC';
export const LUV = 'LUV';

export const CURRENCIES = [ETH, SDC, LUV];

export const CURRENCY_SERVICES = {
	[ETH]: ethService,
	[SDC]: sdcTokenService,
	[LUV]: luvTokenService,
};

export const CONTRACT_ADDRESSES = {
	[__APP_CONTRACT_LUV_TOKEN__]: LUV,
	[__APP_CONTRACT_SDC_TOKEN__]: SDC,
};
