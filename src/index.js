import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import touchIdActions from './actions/TouchIdActions';

import Routes from './routes'; // Or wherever you keep your reducers
import './assets/loader';
import globalActions from './actions/GlobalActions';

// Create a history of your choosing (we're using a browser history in this case)
import history from './history';
import store from './store';

// ReactDOM.render(
// 	<SplashScreen title="Welcome to SDCoin Wallet">
// 		<i className="loading" />
// 	</SplashScreen>,
// 	document.getElementById('root'),
// );

const startApp = () => {
	store.dispatch(globalActions.init()).then(() => {
	// Now you can dispatch navigation actions from anywhere!
		ReactDOM.render(
			<Provider store={store}>
				{/* ConnectedRouter will use the store from Provider automatically */}
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</Provider>,
			document.getElementById('root'),
		);
	});

};

const onResume = async () => {
	await store.dispatch(touchIdActions.checkAltIdStatus());
};

if (window.cordova) {
	// Cordova application
	document.addEventListener(
		'deviceready',
		() => {
			document.addEventListener('resume', onResume, false);
			startApp();
		},
		false,
	);
} else {
	// Web page
	startApp();
}

