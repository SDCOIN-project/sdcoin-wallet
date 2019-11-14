import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { WALLET_PATH, DASHBOARD_PATH } from '../../../constants/RouterConstants';


const Index = ({ isLogged }) => {
	if (!isLogged) {
		return <Redirect to={WALLET_PATH} />;
	}
	return <Redirect to={DASHBOARD_PATH} />;
};

Index.propTypes = {
	isLogged: PropTypes.bool.isRequired,
};

export default connect((state) => ({
	isLogged: !!state.account.get('address'),
}))(Index);
