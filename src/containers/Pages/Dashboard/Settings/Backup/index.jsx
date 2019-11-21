import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import Header from './../../../../Layout/Header';
import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';

import accountActions from '../../../../../actions/AccountActions';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';
import Button from '../../../../../components/Form/Button';

const Backup = ({ history, validatePinCode, backupMnemonic }) => {
	const [step, setStep] = useState(1);
	const [mnemonic, setMnemonic] = useState(null);
	const [btnCopyTitle, setBtnCopyTitle] = useState('Copy');

	const onSubmit = (pinCode) => {
		setMnemonic(backupMnemonic(pinCode));
		setStep(2);
	};

	const onCopy = () => {
		copy(mnemonic);
		setBtnCopyTitle('Copied');
	};

	switch (step) {
		case 2:
			return (
				<React.Fragment>
					<Header title="Backup" />
					<div className="dashboard backup-page">
						<div className="backup-page__text">
							Write down your BrainKey
						</div>
						<div className="brain-key__item">{mnemonic}</div>
						<div className="dashboard-controls">
							<Button onClick={() => onCopy()} className="button__content">
								{btnCopyTitle}
							</Button>
						</div>
					</div>
				</React.Fragment>
			);
		default:
			return (
				<ValidatePinCode
					title="Enter PIN"
					validate={(pinCode) => validatePinCode(pinCode)}
					onSubmit={(pinCode) => onSubmit(pinCode)}
					onBack={() => history.push(SETTINGS_PATH)}
				/>
			);
	}
};

Backup.propTypes = {
	history: PropTypes.object,
	validatePinCode: PropTypes.func.isRequired,
	backupMnemonic: PropTypes.func.isRequired,
};

Backup.defaultProps = {
	history: {},
};

export default connect(
	() => ({}),
	(dispatch) => ({
		validatePinCode: (pinCode) => dispatch(accountActions.validatePinCode(pinCode)),
		backupMnemonic: (pinCode) => dispatch(accountActions.backupMnemonic(pinCode)),
	}),
)(Backup);
