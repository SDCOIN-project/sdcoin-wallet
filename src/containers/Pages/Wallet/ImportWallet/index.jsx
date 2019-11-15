import React from 'react';
import Header from './../../../../containers/Layout/Header';
import Button from './../../../../components/Form/Button';

const ImportWallet = () => (
	<div className="dashboard">
		<Header title="Import wallet" />
		<div className="dashboard-page">
			<div className="dashboard-page__text">Please insert your BrainKey to continue</div>
			<div className="dashboard-page__information">
				<textarea className="dashboard-page__brain-key is-textarea is-error" placeholder="BrainKey…" />
				<p className="input__text-error">Incorrect Brain Key</p>
			</div>
			<div className="dashboard-page__controls">
				<Button className="is-large">Continue</Button>
			</div>
		</div>
	</div>
);
export default ImportWallet;
