import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import history from '../../../../../history';

import Button from './../../../../../components/Form/Button';
import web3Service from './../../../../../services/Web3Service';
import { formatPrecision } from '../../../../../helpers/FunctionHelper';

import { SDC, LUV } from '../../../../../constants/CurrencyConstants';
import { EXCHANGE_FUNDS_PATH } from '../../../../../constants/RouterConstants';
import accountActions from '../../../../../actions/AccountActions';

const BalanceCard = ({
	balances, selectedCurrency, setSelectedCurrency, name, cardClassName, icon,
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
			<i className={`is-icon ${icon}`} />
			<span className="postfix-top">{name}</span>
			{name === SDC ? <Button onClick={() => history.push(EXCHANGE_FUNDS_PATH)} className="is-small">Swap to {LUV}</Button> : null}
		</div>
		<div className="balances-list__value">{formatPrecision(web3Service.fromWei(balances[name], 'ether').toString())}</div>
	</a>
);

BalanceCard.propTypes = {
	cardClassName: PropTypes.string,
	name: PropTypes.string.isRequired,
	balances: PropTypes.object.isRequired,
	selectedCurrency: PropTypes.string.isRequired,
	setSelectedCurrency: PropTypes.func.isRequired,
	icon: PropTypes.string,
};

BalanceCard.defaultProps = {
	cardClassName: '',
	icon: '',
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
