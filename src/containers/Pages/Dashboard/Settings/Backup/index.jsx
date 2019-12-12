import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../../../../components/Form/Button';
import Header from './../../../../Layout/Header';
import ValidatePinCode from '../../../../../components/PinCode/ValidatePinCode';

import accountActions from '../../../../../actions/AccountActions';
import notificationActions from '../../../../../actions/NotificationActions';
import { SETTINGS_PATH } from '../../../../../constants/RouterConstants';
import clipboardService from '../../../../../services/ClipboardService';

const Backup = ({
	history, showErrorNotification,
}) => {
	const [step, setStep] = useState(1);
	const [mnemonic, setMnemonic] = useState(null);
	const [btnCopyTitle, setBtnCopyTitle] = useState('Copy');

	const onSubmit = (pinCode) => {
		try {
			setMnemonic(accountActions.getDecryptedMnemonic(pinCode));
			setStep(2);
		} catch (error) {
			showErrorNotification({ text: error.message });
		}
	};

	const onCopy = () => {
		clipboardService.copy(mnemonic);
		setBtnCopyTitle('Copied');
	};

	switch (step) {
		case 2:
			return (
				<div className="show-top-all">
					<Header backButton={() => history.push(SETTINGS_PATH)} title="Backup" />
					<div className="dashboard backup-page">
						<div className="backup-page__text">
							Write down your BrainKey
						</div>
						<div className="brain-key__item">{mnemonic}</div>
						<div className="dashboard-controls">
							<Button onClick={() => onCopy()} className="button__content is-large">
								{btnCopyTitle}
							</Button>
						</div>
					</div>
				</div>
			);
		default:
			return (
				<ValidatePinCode
					title="Confirm with PIN"
					validate={(pinCode) => accountActions.validatePinCode(pinCode)}
					onSubmit={(pinCode) => onSubmit(pinCode)}
					onBack={() => history.push(SETTINGS_PATH)}
				/>
			);
	}
};

Backup.propTypes = {
	history: PropTypes.object,
	showErrorNotification: PropTypes.func.isRequired,
};

Backup.defaultProps = {
	history: {},
};

export default connect(
	() => ({}),
	(dispatch) => ({
		showErrorNotification: (currency) => dispatch(notificationActions.errorNotification(currency)),
	}),
)(Backup);
