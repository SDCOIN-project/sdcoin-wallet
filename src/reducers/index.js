import { reducer as modal } from 'redux-modal';
import globalReducer from './GlobalReducer';
import accountReducer from './AccountReducer';
import transactionHistoryReducer from './TransactionHistoryReducer';
import scanQrCodeReducer from './ScanQrCodeReducer';

export default {
	modal,
	global: globalReducer.reducer,
	account: accountReducer.reducer,
	transaction: transactionHistoryReducer.reducer,
	scanQrCode: scanQrCodeReducer.reducer,
};
