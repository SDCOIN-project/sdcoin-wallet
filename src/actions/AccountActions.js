import AccountReducer from '../reducers/AccountReducer';
import BaseActions from './BaseActions';

class AccountActions extends BaseActions {

}

const accountActions = new AccountActions(AccountReducer);
export default accountActions;

