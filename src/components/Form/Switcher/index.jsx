import React from 'react';
import PropTypes from 'prop-types';

const Switcher = ({
	className, checked, disabled, children, onChange, ...props
}) => (
	<div className={`switcher-container ${className}`}>
		<label>
			<input
				type="checkbox"
				checked={checked}
				disabled={disabled}
				onChange={(e) => onChange(e)}
				{...props}
			/>
			<div className="icon">
				<div className="circle" />
			</div>
			{ children && <div>{children}</div> }
		</label>
	</div>
);

Switcher.propTypes = {
	className: PropTypes.string,
	checked: PropTypes.bool,
	children: PropTypes.any,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

Switcher.defaultProps = {
	className: '',
	checked: false,
	children: null,
	disabled: false,
	onChange: () => {},
};

export default Switcher;
