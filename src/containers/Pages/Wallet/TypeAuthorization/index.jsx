import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Button from './../../../../components/Form/Button';

import {
	CREATE_WALLET_PATH,
	IMPORT_WALLET_PATH,
} from '../../../../constants/RouterConstants';

const TypeAuthorization = ({ history }) => (
	<div className="authorization-page">
		<div className="logo" />
		<div className="authorization-page__title">Welcome to SDCoin Wallet</div>
		<div className="authorization-page__bottom-container">
			<Button className="is-light-bg" onClick={() => history.push(IMPORT_WALLET_PATH)}>Yes, import wallet</Button>
			<Button className="is-light-bg" onClick={() => history.push(CREATE_WALLET_PATH)}>No, create wallet</Button>
			{/* loading */}
			{/* <i className="loading" /> */}
		</div>
	</div>
);

TypeAuthorization.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(TypeAuthorization);
