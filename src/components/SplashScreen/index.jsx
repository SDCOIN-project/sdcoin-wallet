import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const SplashScreen = ({ title, children }) => (
	<div className="authorization-page with-animation">
		<TransitionGroup className="flex-100">
			<CSSTransition
				in
				appear
				timeout={1200}
				classNames="fade-splash-screen"
			>
				<div className="flex-100 with-padding">
					<div className="logo" />
					<div className="authorization-page__title">{title}</div>
					<div className="authorization-page__bottom-container">
						{children}
					</div>
				</div>
			</CSSTransition>
		</TransitionGroup>
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
