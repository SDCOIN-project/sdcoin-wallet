import React from 'react';
import { Route, Switch } from 'react-router';

import Index from './Index';
import Backup from './Backup';

import PageNotFound from '../../PageNotFound';

import {
	SETTINGS_PATH,
	BACKUP_PATH,
} from '../../../../constants/RouterConstants';

const Settings = () => (
	<Switch>
		<Route exact path={SETTINGS_PATH} component={Index} />
		<Route path={BACKUP_PATH} component={Backup} />

		<Route path="*" component={PageNotFound} />
	</Switch>
);

export default Settings;
