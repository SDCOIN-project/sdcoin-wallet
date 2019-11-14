import { reducer as modal } from 'redux-modal';
import globalReducer from './GlobalReducer';
import accountReducer from './AccountReducer';

export default {
	modal,
	global: globalReducer.reducer,
	account: accountReducer.reducer,
};
