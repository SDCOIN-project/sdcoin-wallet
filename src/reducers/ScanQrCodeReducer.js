import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	show: false,
	title: '',
	description: '',
	onScan: () => {},
});

export default createModule({
	name: 'scan_qr_code',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
	},
});
