import { createModule } from 'redux-modules';
import { Stack } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

export const DEFAULT_FIELDS = Stack([]);

export default createModule({
	name: 'notifications',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),

		add: {
			reducer: (state, { payload }) => {
				state = state.unshift(payload);
				return state;
			},
		},
		delete: {
			reducer: (state, { payload }) => {
				state = state.filter((notification) => notification.id !== payload.id);
				return state;
			},
		},
	},
});
