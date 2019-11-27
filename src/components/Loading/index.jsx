import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loading = ({ className }) => (
	<div className={classNames('loading-container', className)}>
		<i className="loading loading-blue-icon" />
	</div>
);

Loading.propTypes = {
	className: PropTypes.string,
};

Loading.defaultProps = {
	className: '',
};

export default Loading;
