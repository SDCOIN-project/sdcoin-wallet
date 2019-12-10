import React from 'react';
import { ETH, SDC, LUV } from '../../../../../constants/CurrencyConstants';
import BalanceCard from './BalanceCard';

const balancesInfo = [
	{ name: SDC, cardClassName: 'bg-sdc', icon: 'sdc-coin-icon' },
	{ name: ETH, cardClassName: 'is-small bg-eth', icon: 'eth-coin-icon ' },
	{ name: LUV, cardClassName: 'is-small bg-luv', icon: 'luv-coin-icon' },
];

const Balances = () => (
	<div className="balances">
		<div className="balances-body">
			<div className="header-title header-title-balances">Balances</div>
			<div className="balances-list">
				{balancesInfo.map(({ name, cardClassName, icon }) => <BalanceCard key={name} name={name} cardClassName={cardClassName} icon={icon} />)}
			</div>
		</div>
	</div>
);

export default Balances;
