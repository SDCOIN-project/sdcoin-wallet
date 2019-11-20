import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from './../../../../../components/Form/Button';
import web3Service from './../../../../../services/Web3Service';

import { ETH, SDC, LUV } from '../../../../../constants/CurrencyConstants';

const Balances = ({ balances }) => (
	<div className="balances">
		{/* add className "animation-change-size" to reduce block size */}
		<div className="balances-body ">
			<div className="header-title header-title-balances">Balances</div>
			<div className="balances-list">
				<div className="balances-list__item bg-sdc">
					<div className="balances-list__item-title">
						<i className="is-icon sdc-coin-icon" />
						<span className="postfix-top">{SDC}</span>
						<Button className="is-small">Swap to {LUV}</Button>
					</div>
					<div className="balances-list__value">{web3Service.fromWei(balances[SDC], 'ether').toNumber()}<span className="postfix">{SDC}</span></div>
				</div>
				<div className="balances-list__item is-small bg-eth">
					<div className="balances-list__item-title">
						<i className="is-icon sdc-coin-icon" />
						<span className="postfix-top">Ethereum</span>
					</div>
					<div className="balances-list__value">{web3Service.fromWei(balances[ETH], 'ether').toNumber()}<span className="postfix">{ETH}</span></div>
				</div>
				<div className="balances-list__item is-small bg-luv">
					<div className="balances-list__item-title">
						<i className="is-icon sdc-coin-icon" />
						<span className="postfix-top">{LUV}</span>
					</div>
					<div className="balances-list__value">{web3Service.fromWei(balances[LUV], 'ether').toNumber()}<span className="postfix">{LUV}</span></div>
				</div>
			</div>
		</div>
	</div>
);

Balances.propTypes = {
	balances: PropTypes.object.isRequired,
};

export default connect((state) => ({
	balances: state.account.get('balances').toJSON(),
}))(Balances);

