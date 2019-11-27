import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

import { CURRENCIES, SDC } from '../constants/CurrencyConstants';

export const DEFAULT_FIELDS = Map({
	address: null,
	balances: Map(Object.values(CURRENCIES).reduce((obj, currency) => {
		obj[currency] = '0';
		return obj;
	}, {})),
	selectedCurrency: SDC,
});

export default createModule({
	name: 'account',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),

		logout: {
			reducer: (state) => {
				state = state.set('address', null);

				return state;
			},
		},
	},
});
