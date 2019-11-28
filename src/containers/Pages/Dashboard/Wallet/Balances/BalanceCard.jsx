import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './../../../../../components/Form/Button';
import web3Service from './../../../../../services/Web3Service';

import { SDC, LUV } from '../../../../../constants/CurrencyConstants';
import accountActions from '../../../../../actions/AccountActions';

const BalanceCard = ({
	balances, selectedCurrency, setSelectedCurrency, name, cardClassName,
}) => (
	<a
		href="#"
		onClick={(e) => {
			e.preventDefault();
			setSelectedCurrency(name);
		}}
		className={classNames('balances-list__item', cardClassName, { 'is-active': selectedCurrency === name })}
	>
		<div className="balances-list__item-title">
			<i className="is-icon sdc-coin-icon" />
			<span className="postfix-top">{name}</span>
			{name === SDC ? <Button className="is-small">Swap to {LUV}</Button> : null}
		</div>
		<div className="balances-list__value">{web3Service.fromWei(balances[name], 'ether').toNumber()}<span className="postfix">{name}</span></div>
	</a>
);

BalanceCard.propTypes = {
	cardClassName: PropTypes.string,
	name: PropTypes.string.isRequired,
	balances: PropTypes.object.isRequired,
	selectedCurrency: PropTypes.string.isRequired,
	setSelectedCurrency: PropTypes.func.isRequired,
};

BalanceCard.defaultProps = {
	cardClassName: '',
};

export default connect(
	(state) => ({
		balances: state.account.get('balances').toJSON(),
		selectedCurrency: state.account.get('selectedCurrency'),
	}),
	(dispatch) => ({
		setSelectedCurrency: (currency) => dispatch(accountActions.setSelectedCurrency(currency)),
	}),
)(BalanceCard);
