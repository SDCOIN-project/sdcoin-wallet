import React from 'react';
import { ETH, SDC, LUV } from '../../../../../constants/CurrencyConstants';
import BalanceCard from './BalanceCard';

const balancesInfo = [
	{ name: SDC, cardClassName: 'bg-sdc' },
	{ name: ETH, cardClassName: 'is-small bg-eth' },
	{ name: LUV, cardClassName: 'is-small bg-luv' },
];

const Balances = () => (
	<div className="balances">
		<div className="balances-body">
			<div className="header-title header-title-balances">Balances</div>
			<div className="balances-list">
				{balancesInfo.map(({ name, cardClassName }) => <BalanceCard key={name} name={name} cardClassName={cardClassName} />)}
			</div>
		</div>
	</div>
);

export default Balances;
