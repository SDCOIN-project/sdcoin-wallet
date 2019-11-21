import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreatePinCode from '../../../../components/PinCode/CreatePinCode';
import EnterMnemonicPhrase from './EnterMnemonicPhrase';

import accountActions from '../../../../actions/AccountActions';

const ImportWallet = ({ createWallet }) => {
	const [step, setStep] = useState(1);
	const [phrase, setPhrase] = useState(null);

	switch (step) {
		case 2:
			return (
				<CreatePinCode
					onSubmit={(pinCode) => createWallet(pinCode, phrase)}
					onBack={() => setStep(1)}
				/>
			);
		default:
			return (<EnterMnemonicPhrase
				onNext={(data) => {
					setPhrase(data.phrase);
					setStep(2);
				}}
			/>);
	}
};

ImportWallet.propTypes = {
	createWallet: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		createWallet: (pinCode, mnemonic) => dispatch(accountActions.createWallet(pinCode, mnemonic)),
	}),
)(ImportWallet);
