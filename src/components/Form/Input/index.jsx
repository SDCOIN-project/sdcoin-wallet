import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isFocused: false,
		};
	}

	onFocus() {
		this.setState({ isFocused: true });
	}

	onBlur() {
		this.setState({ isFocused: false });
	}

	onChange(e) {
		this.props.onChange(e);
	}

	render() {
		const {
			className, value, isError, error, label, isInteger, decimalScale, title, readOnly, children, type, ...props
		} = this.props;
		const { isFocused } = this.state;

		return (
			<React.Fragment>
				<div className={`input-field ${className || ''}`}>
					{ title && <div className="input-field__title">{title}</div>}
					<div className={`input-field__input ${label ? 'with-label' : ''} ${value || isFocused ? 'is-filled' : ''} ${readOnly ? 'read-only' : ''} ${isError || error ? ' is-error' : ''}`}>
						{<input
							autoComplete="off"
							value={value}
							onFocus={() => this.onFocus()}
							onBlur={() => this.onBlur()}
							onChange={(e) => this.onChange(e)}
							readOnly={readOnly}
							type={type}
							{...props}
						/>}
						{children}
						{label && <div className="input-field__label">{label}</div>}
					</div>
					{error && <div className="input-field__error">{error}</div>}
				</div>
			</React.Fragment>
		);
	}

}

Input.propTypes = {
	isInteger: PropTypes.bool,
	decimalScale: PropTypes.number,
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string,
	title: PropTypes.string,
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	children: PropTypes.any,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
	isError: PropTypes.bool,
	type: PropTypes.string,
};

Input.defaultProps = {
	isInteger: false,
	decimalScale: 100,
	className: '',
	value: '',
	label: '',
	title: '',
	error: '',
	children: null,
	onChange: () => {},
	readOnly: false,
	isError: false,
	type: 'text',
};

export default Input;
