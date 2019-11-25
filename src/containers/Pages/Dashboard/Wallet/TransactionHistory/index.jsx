import React from 'react';
import Button from '../../../../../components/Form/Button';

const TransactionHistory = () => (
	<div className="transaction-history">
		<div className="transaction-history__title">
			Transaction History
			<span className="title-inner"><span className="title-inner-dot">·</span>SDC</span>
		</div>
		{/* Block notification  */}
		<a href="#" className="transaction-history__row transaction-history__notification">
			<div className="transaction-history__row-information">
				<i className="is-icon bell-icon" />
				<div className="information-details mt-2">You have new incoming payment</div>
			</div>
			<Button className="qr-code-button">
				<i className="is-icon qr-code-small-white-icon" />
				<span>Get Payment</span>
			</Button>
		</a>
		<a href="#" className="transaction-history__row transaction-history__notification">
			<div className="transaction-history__row-information flex-center">
				<i className="is-icon bell-icon" />
				<div className="information-details">QR code is ready</div>
			</div>
			<Button className="qr-code-button">
				<span>Get QR</span>
			</Button>
		</a>
		<a href="#" className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className="is-icon confirmation-icon" />
				<div className="information-details">
					<p className="information-details__title">Confirmation</p>
					<p className="information-details__text">Wait please...</p>
				</div>
			</div>
			<div className="transaction-history__row-value">0.03<span className="postfix">SDC</span></div>
		</a>
		<a href="#" className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className="is-icon received-arrow-icon" />
				<div className="information-details">
					<p className="information-details__title">Received</p>
					<p className="information-details__text">Oct 30, 08:57</p>
				</div>
			</div>
			<div className="transaction-history__row-value">25.07<span className="postfix">LUV</span></div>
		</a>
		<a href="#" className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className="is-icon send-arrow-icon" />
				<div className="information-details">
					<p className="information-details__title">Send</p>
					<p className="information-details__text">Oct 31, 17:20</p>
				</div>
			</div>
			<div className="transaction-history__row-value">7.318<span className="postfix">SDC</span></div>
		</a>
		<a href="#" className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className="is-icon received-arrow-icon" />
				<div className="information-details">
					<p className="information-details__title">Received</p>
					<p className="information-details__text">Oct 30, 08:57</p>
				</div>
			</div>
			<div className="transaction-history__row-value">0.0087<span className="postfix">ETH</span></div>
		</a>
		<a href="#" className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className="is-icon received-arrow-icon" />
				<div className="information-details">
					<p className="information-details__title">Received</p>
					<p className="information-details__text">Oct 30, 08:57</p>
				</div>
			</div>
			<div className="transaction-history__row-value">0.793<span className="postfix">SDC</span></div>
		</a>
		<a href="#" className="transaction-history__row">
			<div className="transaction-history__row-information">
				<i className="is-icon received-arrow-icon" />
				<div className="information-details">
					<p className="information-details__title">Received</p>
					<p className="information-details__text">Oct 30, 08:57</p>
				</div>
			</div>
			<div className="transaction-history__row-value">37<span className="postfix">SDC</span></div>
		</a>
		{/* <div className="loading-container">
			<i className="loading loading-blue-icon" />
		</div> */}
	</div>
);

export default TransactionHistory;
