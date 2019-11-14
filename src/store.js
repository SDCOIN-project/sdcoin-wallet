import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import { routerMiddleware, connectRouter } from 'connected-react-router';

import history from './history';
import reducers from './reducers';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
	combineReducers({
		...reducers,
		router: connectRouter(history),
	}), {},
	compose(
		applyMiddleware(thunk),
		applyMiddleware(middleware),
		// eslint-disable-next-line no-underscore-dangle
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
	),
);

export default store;
