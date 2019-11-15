import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Button from './../../../../components/Form/Button';

import {
	CREATE_WALLET_PATH,
	IMPORT_WALLET_PATH,
} from '../../../../constants/RouterConstants';

import SplashScreen from '../../../../components/SplashScreen';

const TypeAuthorization = ({ history }) => (
	<SplashScreen title="Do you have an account">
		<Button className="is-light-bg" onClick={() => history.push(IMPORT_WALLET_PATH)}>Yes, import wallet</Button>
		<Button className="is-light-bg" onClick={() => history.push(CREATE_WALLET_PATH)}>No, create wallet</Button>
	</SplashScreen>
);

TypeAuthorization.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(TypeAuthorization);
