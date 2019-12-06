import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';
import { CURRENCIES } from '../constants/CurrencyConstants';

export const DEFAULT_FIELDS = Map({
	count: 15,
	start: 0,
	list: List([]),
	all: 0,
	loading: true,
	hasMore: false,
	selectedTransaction: new Map({}),
	currencies: Map(Object.values(CURRENCIES).reduce((obj, currency) => {
		obj[currency] = Map({
			// start: 0,
			list: List([]),
			pendingList: List([]),
			// countItems: 0,
			loading: false,
			hasMore: true,
		});

		return obj;
	}, {})),
});

export default createModule({
	name: 'transaction_history',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),

		setTransactions: {
			reducer: (state, { payload }) => {
				const {
					list, start, count, all,
				} = payload;

				if (!list) {
					return state;
				}
				state = state.set('list', list);
				state = state.set('start', start);
				state = state.set('count', count);
				state = state.set('all', all);

				return state;
			},
		},

		checkInPendingList: {
			reducer: (state, { payload }) => {
				const { currency, hash } = payload;
				state = state.updateIn(['currencies', currency, 'pendingList'], (list) => list.filter((transaction) => transaction.hash !== hash));

				return state;
			},
		},
	},
});
