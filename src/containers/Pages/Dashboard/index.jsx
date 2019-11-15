import React from 'react';
import { Route, Switch } from 'react-router';

import Wallet from './Wallet';
import Send from './Send';
import Receive from './Receive';
import Settings from './Settings';
import ExchangeFunds from './ExchangeFunds';

import PageNotFound from '../PageNotFound';

import Sidebar from '../../Layout/Sidebar';

import {
	DASHBOARD_PATH,
	SEND_TRANSACTION_PATH,
	RECEIVE_PATH,
	SETTINGS_PATH,
	EXCHANGE_FUNDS_PATH,
} from '../../../constants/RouterConstants';

const Dashboard = () => (
	<React.Fragment>
		<Switch>
			<Route exact path={DASHBOARD_PATH} component={Wallet} />
			<Route exact path={SEND_TRANSACTION_PATH} component={Send} />
			<Route exact path={RECEIVE_PATH} component={Receive} />
			<Route exact path={SETTINGS_PATH} component={Settings} />
			<Route exact path={EXCHANGE_FUNDS_PATH} component={ExchangeFunds} />

			<Route path="*" component={PageNotFound} />
		</Switch>
		<Sidebar />
	</React.Fragment>
);

export default Dashboard;
