import React from 'react';
import { Route, Switch } from 'react-router';

import OnlyGuest from './helpers/HighOrderComponents/OnlyGuest';
import OnlyUser from './helpers/HighOrderComponents/OnlyUser';

import App from './containers/App';
import Index from './containers/Pages/Index';
import WalletComponent from './containers/Pages/Wallet';
import DashboardComponent from './containers/Pages/Dashboard';
import PageNotFound from './containers/Pages/PageNotFound';

import {
	INDEX_PATH,
	DASHBOARD_PATH,
	WALLET_PATH,
} from './constants/RouterConstants';

const Wallet = OnlyGuest(WalletComponent);
const Dashboard = OnlyUser(DashboardComponent);

const Routes = () => (
	<App>
		<Switch>
			<Route exact path={INDEX_PATH} component={Index} />

			<Route path={WALLET_PATH} component={Wallet} />
			<Route path={DASHBOARD_PATH} component={Dashboard} />

			<Route component={PageNotFound} />
		</Switch>
	</App>
);

export default Routes;
