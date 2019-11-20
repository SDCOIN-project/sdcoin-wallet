import React from 'react';

import Balances from './Balances';
import TransactionHistory from './TransactionHistory';


const Wallet = () => (
	<React.Fragment>
		<Balances />
		<TransactionHistory />
	</React.Fragment>
);

export default Wallet;
