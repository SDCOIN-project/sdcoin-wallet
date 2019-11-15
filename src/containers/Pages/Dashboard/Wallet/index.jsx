import React from 'react';
import Button from './../../../../components/Form/Button';


const Wallet = () => (
	<div className="balances">
		{/* add className "animation-change-size" to reduce block size */}
		<div className="balances-body">
			<div className="balances-body__message">Updated 2 minutes ago</div>
			<div className="header-title header-title-balances">Balances</div>
			<div className="balances-list">
				<div className="balances-list__item bg-sdc">
					<div className="balances-list__item-title">
						<i className="is-icon sdc-coin-icon" />
						<span className="postfix-top">SDC</span>
						<Button className="is-small">Swap to LUV</Button>
					</div>
					<div className="balances-list__value">530.0025<span className="postfix">SDC</span></div>
				</div>
				<div className="balances-list__item is-small bg-eth">
					<div className="balances-list__item-title">
						<i className="is-icon sdc-coin-icon" />
						<span className="postfix-top">Ethereum</span>
					</div>
					<div className="balances-list__value">7 001.896<span className="postfix">ETH</span></div>
				</div>
				<div className="balances-list__item is-small bg-luv">
					<div className="balances-list__item-title">
						<i className="is-icon sdc-coin-icon" />
						<span className="postfix-top">LUV</span>
					</div>
					<div className="balances-list__value">0.258746<span className="postfix">LUV</span></div>
				</div>
			</div>
		</div>
		<div className="transaction-history">
			<div className="transaction-history__title">Transaction History</div>
			{/* Block notification  */}
			{/* <div className="transaction-history__row transaction-history__notification">
				<div className="transaction-history__row-information">
					<i className="is-icon bell-icon" />
					<div className="information-details">You have new incoming payment</div>
				</div>
				<a href="#" className="qr-code-button">
					<i className="is-icon qr-code-small-icon" />
					<span>Get Payment</span>
				</a>
			</div> */}
			<div className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon confirmation-icon" />
					<div className="information-details">
						<p className="information-details__title">Confirmation</p>
						<p className="information-details__text">Wait please...</p>
					</div>
				</div>
				<div className="transaction-history__row-value"><span className="is-large">0.03</span>SDC</div>
			</div>
			<div className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon received-arrow-icon" />
					<div className="information-details">
						<p className="information-details__title">Received</p>
						<p className="information-details__text">Oct 30, 08:57</p>
					</div>
				</div>
				<div className="transaction-history__row-value"><span className="is-large">25.07</span>LUV</div>
			</div>
			<div className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon send-arrow-icon" />
					<div className="information-details">
						<p className="information-details__title">Send</p>
						<p className="information-details__text">Oct 31, 17:20</p>
					</div>
				</div>
				<div className="transaction-history__row-value"><span className="is-large">7.318</span>SDC</div>
			</div>
			<div className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon received-arrow-icon" />
					<div className="information-details">
						<p className="information-details__title">Received</p>
						<p className="information-details__text">Oct 30, 08:57</p>
					</div>
				</div>
				<div className="transaction-history__row-value"><span className="is-large">0.0087</span>ETH</div>
			</div>
			<div className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon received-arrow-icon" />
					<div className="information-details">
						<p className="information-details__title">Received</p>
						<p className="information-details__text">Oct 30, 08:57</p>
					</div>
				</div>
				<div className="transaction-history__row-value"><span className="is-large">0.793</span>SDC</div>
			</div>
			<div className="transaction-history__row">
				<div className="transaction-history__row-information">
					<i className="is-icon received-arrow-icon" />
					<div className="information-details">
						<p className="information-details__title">Received</p>
						<p className="information-details__text">Oct 30, 08:57</p>
					</div>
				</div>
				<div className="transaction-history__row-value"><span className="is-large">37</span>SDC</div>
			</div>
		</div>
	</div>
);

export default Wallet;
