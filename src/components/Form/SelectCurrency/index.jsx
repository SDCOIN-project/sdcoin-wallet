import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const SelectCurrency = ({
	className, label, value, children, amount, ...props
}) => (
	<div className={`select-field is-select ${className}`}>
		{label && <div className="select-field__label">{label}</div>}
		<div className="select-field__input">
			<div className="select-inner-item__information-value">{amount} <span className="postfix">{value}</span></div>
			<Dropdown
				{...props}
				value={value}
			/>
		</div>
		{children}
	</div>
);

SelectCurrency.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	amount: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	children: PropTypes.any,
};

SelectCurrency.defaultProps = {
	className: '',
	label: '',
	value: '',
	amount: 0,
	children: null,
};

export default SelectCurrency;
