import React from 'react';
import Header from './../../../../Layout/Header';


const TransactionDetails = () => (
	<React.Fragment>
		<Header className="header-transaction-details">
			<div className="header-transaction-details__title">
				25.07<div className="postfix">SDC</div>
			</div>
			<div className="header-transaction-details__text">
				<p>Received</p>
			</div>
		</Header>
		<div className="dashboard transaction-details-page">
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Date</div>
				<div className="dashboard-stripe__text">October 30, 08:57</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">From</div>
				<div className="dashboard-stripe__text">0x542cc7300EbE9ba4Bb5C8E646C82cfE83f995014</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">To</div>
				<div className="dashboard-stripe__text">5C8E646C82cfE83f9950140x542cc7300EbE9ba4Bb</div>
			</div>
			<div className="dashboard-stripe">
				<div className="dashboard-stripe__title">Transaction hash</div>
				<div className="dashboard-stripe__text">0xdede4a8308233dbe75174f2c1755c2a2b189c5b4f746afa2354a759ae25db004</div>
			</div>
		</div>
	</React.Fragment>
);


export default TransactionDetails;
