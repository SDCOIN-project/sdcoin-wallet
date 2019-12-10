import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GenerateMnemonicPhrase from './GenerateMnemonicPhrase';
import CreatePinCode from './../../../../components/PinCode/CreatePinCode';

import accountActions from '../../../../actions/AccountActions';

const CreateWallet = ({ createWallet }) => {
	const [step, setStep] = useState(1);
	const [phrase, setPhrase] = useState(null);

	switch (step) {
		case 2:
			return (
				<CreatePinCode
					onSubmit={async (pinCode) => { await createWallet(pinCode, phrase); }}
					onBack={() => setStep(1)}
				/>
			);
		default:
			return (<GenerateMnemonicPhrase
				onNext={(data) => {
					setPhrase(data.phrase);
					setStep(2);
				}}
			/>);
	}
};

CreateWallet.propTypes = {
	createWallet: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		createWallet: (pinCode, mnemonic) => dispatch(accountActions.createWallet(pinCode, mnemonic)),
	}),
)(CreateWallet);
