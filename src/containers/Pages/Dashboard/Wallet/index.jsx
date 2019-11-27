import React, { useState } from 'react';

import Balances from './Balances';
import TransactionHistory from './TransactionHistory';

const Wallet = () => {
	const [parent, setParent] = useState(null);
	return (
		<div ref={(ref) => { setParent(ref); }}>
			<Balances />
			<TransactionHistory parent={() => parent} />
		</div>
	);
};

export default Wallet;
