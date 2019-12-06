import ethService from './EthService';
import sdcTokenService from './contracts/SdcTokenService';
import luvTokenService from './contracts/LuvTokenService';
import { ETH, LUV, SDC } from '../constants/CurrencyConstants';

// eslint-disable-next-line import/prefer-default-export
export const CURRENCY_SERVICES = {
	[ETH]: ethService,
	[SDC]: sdcTokenService,
	[LUV]: luvTokenService,
};
