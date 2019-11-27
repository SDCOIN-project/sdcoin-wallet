import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
	className, backButton, title, children, ...props
}) => (
	<header className={`header ${className}`} {...props}>
		{backButton &&
			<a href="#" onClick={(e) => backButton(e)} className="back-button">
				<div className="back-button__container">
					<i className="is-icon back-button-icon" />
				</div>
				<span className="back-button__text">Back</span>
			</a>
		}
		{title &&
			<div className="header-title">{title}</div>
		}
		{children}
	</header>
);

Header.propTypes = {
	className: PropTypes.string,
	backButton: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.any,
};

Header.defaultProps = {
	className: '',
	backButton: null,
	title: '',
	children: null,
};

export default Header;
