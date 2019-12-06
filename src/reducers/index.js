import { reducer as modal } from 'redux-modal';
import globalReducer from './GlobalReducer';
import accountReducer from './AccountReducer';
import escrowReducer from './EscrowReducer';
import notificationReducer from './NotificationReducer';
import transactionHistoryReducer from './TransactionHistoryReducer';
import scanQrCodeReducer from './ScanQrCodeReducer';
import touchIdReducer from './TouchIdReducer';

export default {
	modal,
	global: globalReducer.reducer,
	account: accountReducer.reducer,
	escrow: escrowReducer.reducer,
	notifications: notificationReducer.reducer,
	transactionsHistory: transactionHistoryReducer.reducer,
	scanQrCode: scanQrCodeReducer.reducer,
	touchId: touchIdReducer.reducer,
};
