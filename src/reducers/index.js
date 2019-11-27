import { reducer as modal } from 'redux-modal';
import globalReducer from './GlobalReducer';
import accountReducer from './AccountReducer';
import scanQrCodeReducer from './ScanQrCodeReducer';

export default {
	modal,
	global: globalReducer.reducer,
	account: accountReducer.reducer,
	scanQrCode: scanQrCodeReducer.reducer,
};
