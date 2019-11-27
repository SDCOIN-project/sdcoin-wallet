import React from 'react';
import { Route, Switch } from 'react-router';

import Wallet from './Wallet';
import Send from './Send';
import Receive from './Receive';
import GeneratePayment from './Receive/GeneratePayment';
import PaymentInfo1 from './Receive/PaymentInfo1';
import PaymentInfo2 from './Receive/PaymentInfo2';
import Settings from './Settings';
import ExchangeFunds from './ExchangeFunds';
import TransactionDetails from './Wallet/TransactionDetails';
import PaymentDetails from './Receive/PaymentDetails';

import PageNotFound from '../PageNotFound';

import Sidebar from '../../Layout/Sidebar';

import {
	DASHBOARD_PATH,
	SEND_TRANSACTION_PATH,
	RECEIVE_PATH,
	SETTINGS_PATH,
	EXCHANGE_FUNDS_PATH,
	GENERATE_PAYMENT,
	PAYMENT_INFO1,
	PAYMENT_INFO2,
	TRANSACTION_DETAILS,
	PAYMENT_DETAILS,
} from '../../../constants/RouterConstants';

const Dashboard = () => (
	<React.Fragment>
		<Switch>
			<Route exact path={DASHBOARD_PATH} component={Wallet} />
			<Route exact path={SEND_TRANSACTION_PATH} component={Send} />
			<Route exact path={PAYMENT_DETAILS} component={PaymentDetails} />
			<Route exact path={RECEIVE_PATH} component={Receive} />
			<Route exact path={GENERATE_PAYMENT} component={GeneratePayment} />
			<Route exact path={PAYMENT_INFO1} component={PaymentInfo1} />
			<Route exact path={PAYMENT_INFO2} component={PaymentInfo2} />
			<Route path={SETTINGS_PATH} component={Settings} />
			<Route exact path={EXCHANGE_FUNDS_PATH} component={ExchangeFunds} />
			<Route exact path={TRANSACTION_DETAILS} component={TransactionDetails} />

			<Route path="*" component={PageNotFound} />
		</Switch>
		<Sidebar />
	</React.Fragment>
);

export default Dashboard;
