import React from 'react';
import Header from './../../../../containers/Layout/Header';
import Button from './../../../../components/Form/Button';

const CreateWallet = () => (
	<div className="dashboard">
		<Header title="Create wallet" />
		<div className="dashboard-page">
			<div className="dashboard-page__text attention-icon">Write down your BrainKey! Once you lose this key you won&apos;t be able to get a new one.</div>
			<div className="dashboard-page__brain-key">Saucer jumble shed salespeople loop throwback downstairs franchisee urchin watch swan lunatic</div>
			<div className="dashboard-page__controls">
				<Button className="is-transparent">Copy</Button>
				<Button>Continue</Button>
			</div>
		</div>
	</div>
);

export default CreateWallet;
