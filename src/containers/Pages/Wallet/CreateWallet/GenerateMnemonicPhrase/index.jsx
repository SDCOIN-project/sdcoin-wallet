import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import walletService from '../../../../../services/WalletService';

import Header from './../../../../../containers/Layout/Header';
import Button from './../../../../../components/Form/Button';

const CreateWallet = ({ onNext }) => {
	const [phrase] = useState(walletService.generateMnemonic());
	const [btnCopyTitle, setBtnCopyTitle] = useState('Copy');

	const onCopy = () => {
		copy(phrase);
		setBtnCopyTitle('Copied');
	};

	return (
		<div className="dashboard">
			<Header title="Create wallet" />
			<div className="dashboard-page">
				<div className="dashboard-page__text attention-icon">
					Write down your BrainKey! Once you lose this key you won&apos;t be able to get a new one.
				</div>
				<div className="dashboard-page__brain-key">{phrase}</div>
				<div className="dashboard-page__controls">
					<Button onClick={() => onCopy()} className="is-transparent">{btnCopyTitle}</Button>
					<Button onClick={() => onNext({ phrase })}>Continue</Button>
				</div>
			</div>
		</div>
	);

};

CreateWallet.propTypes = {
	onNext: PropTypes.func,
};

CreateWallet.defaultProps = {
	onNext: () => {},
};

export default CreateWallet;
