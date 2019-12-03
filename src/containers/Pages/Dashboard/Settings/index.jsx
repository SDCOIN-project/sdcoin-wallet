import React from 'react';
import { Route, Switch } from 'react-router';

import Index from './Index/index';
import Backup from './Backup';
import ChangePassword from './ChangePassword';
import CreateTouchIdPinCode from './CreateTouchIdPinCode';
import PageNotFound from '../../PageNotFound';

import {
	SETTINGS_PATH,
	BACKUP_PATH,
	CHANGE_PASSWORD_PATH,
	CREATE_TOUCH_ID_PATH,
} from '../../../../constants/RouterConstants';
import accountActions from '../../../../actions/AccountActions';

const Settings = () => (
	<Switch>
		<Route exact path={SETTINGS_PATH} component={Index} />
		<Route path={BACKUP_PATH} component={Backup} />
		<Route path={CHANGE_PASSWORD_PATH} component={ChangePassword} />
		<Route
			exact
			path={CREATE_TOUCH_ID_PATH}
			render={() => (<CreateTouchIdPinCode validate={(pinCode) => accountActions.validatePinCode(pinCode)} />)}
		/>

		<Route path="*" component={PageNotFound} />
	</Switch>
);

export default Settings;
