export const SDC = 'SDC';
export const ETH = 'ETH';
export const LUV = 'LUV';

export const CURRENCIES = [SDC, ETH, LUV];

export const LUV_EXCHANGE_RATE = 1000;

export const TOKEN_ADDRESS = {
	LUV: __APP_CONTRACT_LUV_TOKEN__.toLowerCase(),
	SDC: __APP_CONTRACT_SDC_TOKEN__.toLowerCase(),
};

export const TOKEN_NAME = {
	[__APP_CONTRACT_LUV_TOKEN__.toLowerCase()]: LUV,
	[__APP_CONTRACT_SDC_TOKEN__.toLowerCase()]: SDC,
};

export const DEFAULT_CURRENCY = SDC;
