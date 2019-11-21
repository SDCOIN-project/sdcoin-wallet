import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
	className, disabled, children, loading, ...props
}) => (
	<button
		type="button"
		className={`button ${className} ${loading ? 'is-loading' : ''}`}
		disabled={loading || disabled}
		{...props}
	>
		<React.Fragment>
			{children && <div className="button__content">{children}</div>}
			{loading && <i className="is-icon loading-button" />}
		</React.Fragment>
	</button>
);

Button.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.any,
	loading: PropTypes.bool,
};

Button.defaultProps = {
	className: '',
	disabled: false,
	children: null,
	loading: false,
};

export default Button;
