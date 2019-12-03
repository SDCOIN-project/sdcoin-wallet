import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	faceIdEnabled: false,
	touchIdEnabled: false,
});

export default createModule({
	name: 'touch_id',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
	},
});
