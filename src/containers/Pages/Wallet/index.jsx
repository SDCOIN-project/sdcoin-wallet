import React from 'react';
import { Route, Switch } from 'react-router';

import {
	WALLET_PATH,
	CREATE_WALLET_PATH,
	IMPORT_WALLET_PATH,
} from '../../../constants/RouterConstants';

import TypeAuthorization from './TypeAuthorization';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';

import PageNotFound from './../PageNotFound';

const Wallet = () => (
	<Switch>
		<Route exact path={WALLET_PATH} component={TypeAuthorization} />
		<Route path={CREATE_WALLET_PATH} component={CreateWallet} />
		<Route path={IMPORT_WALLET_PATH} component={ImportWallet} />

		<Route path="*" component={PageNotFound} />
	</Switch>
);

export default Wallet;

