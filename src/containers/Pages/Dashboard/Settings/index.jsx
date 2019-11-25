import React from 'react';
import { Route, Switch } from 'react-router';

import Index from './Index';
import Backup from './Backup';
import ChangePassword from './ChangePassword';

import PageNotFound from '../../PageNotFound';

import {
	SETTINGS_PATH,
	BACKUP_PATH,
	CHANGE_PASSWORD_PATH,
} from '../../../../constants/RouterConstants';

const Settings = () => (
	<Switch>
		<Route exact path={SETTINGS_PATH} component={Index} />
		<Route path={BACKUP_PATH} component={Backup} />
		<Route path={CHANGE_PASSWORD_PATH} component={ChangePassword} />

		<Route path="*" component={PageNotFound} />
	</Switch>
);

export default Settings;
