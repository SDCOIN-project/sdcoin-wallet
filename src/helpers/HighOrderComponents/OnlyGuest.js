import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { INDEX_PATH } from '../../constants/RouterConstants';

export default function (WrappedComponent) {

	const OnlyGuest = (props) => {
		if (!props.isLogged) {
			return <WrappedComponent {...props} />;
		}
		return <Redirect to={INDEX_PATH} />;
	};

	OnlyGuest.propTypes = {
		isLogged: PropTypes.bool.isRequired,
	};

	return connect((state) => ({
		isLogged: !!state.account.get('address'),
	}))(OnlyGuest);
}
