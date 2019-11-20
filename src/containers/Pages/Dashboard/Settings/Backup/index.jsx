import React from 'react';
import Header from './../../../../Layout/Header';

const Backup = () => (
	<React.Fragment>
		<Header title="Backup" />
		<div className="dashboard backup-page">
			<div className="backup-page__text">
				Write down your BrainKey
			</div>
			<div className="brain-key__item">Saucer jumble shed salespeople loop throwback downstairs franchisee urchin watch swan lunatic</div>
			<div className="dashboard-controls">
				<button type="button" className="button is-large">
					<div className="button__content">Copy</div>
				</button>
			</div>
		</div>
	</React.Fragment>

);

export default Backup;
