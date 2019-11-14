import { reducer as modal } from 'redux-modal';
import globalReducer from './GlobalReducer';

export default {
	modal,
	global: globalReducer.reducer,
};
