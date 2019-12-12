import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {

	constructor(props) {
		super(props);
		this.state = { animation: false };
	}

	onClick(e) {
		this.animation();
		this.props.onClick(e);
	}

	animation() {
		if (!this.state.animation) {
			this.setState({ animation: true });
			setTimeout(() => {
				this.setState({ animation: false });
			}, 800);
		}
	}

	render() {
		const {
			className, disabled, children, onClick, loading, ...props
		} = this.props;
		return (
			<button
				type="button"
				className={`button ${className} ${loading ? 'is-loading' : ''} ${this.state.animation ? 'standard-animation-for-buttons' : ''}`}
				disabled={loading || disabled}
				onClick={(e) => {
					this.onClick(e);
				}}
				{...props}
			>
				<React.Fragment>
					{children && <div className="button__content">{children}</div>}
					{loading && <i className="is-icon loading-button" />}
				</React.Fragment>
			</button>
		);
	}

}

Button.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.any,
	loading: PropTypes.bool,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	className: '',
	disabled: false,
	children: null,
	loading: false,
	onClick: () => {},
};


export default Button;
