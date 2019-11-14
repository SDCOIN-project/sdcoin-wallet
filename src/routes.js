import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Index from './containers/Index';
import PageNotFound from './containers/PageNotFound';

import { INDEX_PATH } from './constants/RouterConstants';

const Routes = () => (
	<App>
		<Switch>
			<Route exact path={INDEX_PATH} component={Index} />
			<Route component={PageNotFound} />
		</Switch>
	</App>
);

export default Routes;
