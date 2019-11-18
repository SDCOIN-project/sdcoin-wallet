import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const Select = ({
	className, label, value, children, ...props
}) => (
	<div className={`select-field is-select ${className}`}>
		{
			label && <div className="select-field__label">{label}</div>
		}
		<div className="select-field__input">
			<div className="select-inner-item__information-value">{value.value} <span className="postfix">{value.postfix}</span></div>
			<Dropdown
				{...props}
				value={value.value}
			/>
		</div>
		{children}
	</div>
);

Select.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.object,
	children: PropTypes.any,
};

Select.defaultProps = {
	className: '',
	label: '',
	value: {},
	children: null,
};

export default Select;
