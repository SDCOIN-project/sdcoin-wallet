import React from 'react';
import PropTypes from 'prop-types';
import web3Service from '../../../services/Web3Service';

const Option = ({
	balance, currency,
}) => (
	<div className="select-inner-item">
		<i className={`is-icon ${currency.toLowerCase()}-coin-icon`} />
		<div className="select-inner-item__information">
			<div className="select-inner-item__information-title">{currency}</div>
			<div className="select-inner-item__information-value">
				{web3Service.fromWeiToEther(balance)} <span className="postfix">{currency}</span>
			</div>
		</div>
	</div>
);

Option.propTypes = {
	currency: PropTypes.string.isRequired,
	balance: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

export default Option;
