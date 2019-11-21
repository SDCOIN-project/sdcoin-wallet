import React from 'react';
import PropTypes from 'prop-types';

const SplashScreen = ({ title, children }) => (
	<div className="authorization-page">
		<div className="logo" />
		<div className="authorization-page__title">{title}</div>
		<div className="authorization-page__bottom-container">
			{children}
		</div>
		{/* <i className="loading loading-white-icon" />  */}


	</div>
);

SplashScreen.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.any,
};

SplashScreen.defaultProps = {
	children: null,
};

export default SplashScreen;
