import React from 'react';
import Header from './../../../../containers/Layout/Header';
import Button from './../../../../components/Form/Button';

const ImportWallet = () => (
	<div className="dashboard-container">
		<Header title="Import wallet" />
		<div className="dashboard wallet-page">
			<div className="wallet-page__text">Please insert your BrainKey to continue</div>
			<div className="brain-key">
				<textarea className="brain-key__item is-textarea is-error" placeholder="BrainKey…" />
				<p className="input__text-error">Incorrect Brain Key</p>
			</div>
			<div className="dashboard-controls">
				<Button className="is-large">Continue</Button>
			</div>
		</div>
	</div>
);
export default ImportWallet;
