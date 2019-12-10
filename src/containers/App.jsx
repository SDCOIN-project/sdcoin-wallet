import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toast from '../components/Toast';
import { InfoModal, ConfirmModal } from '../components/Modals';
import Notifications from '../components/Notifications';
import ScanQrCode from '../components/ScanQrCode';
import ValidatePinCode from '../components/PinCode/ValidatePinCode';

import accountActions from '../actions/AccountActions';
import GlobalActions from '../actions/GlobalActions';

const App = ({
	children, isActiveCamera, isLocked, address, unlock,
}) => {

	const renderModals = () => (
		<React.Fragment>
			<InfoModal />
			<ConfirmModal />
		</React.Fragment>
	);

	return (
		<div className="wrapper" style={{ backgroundColor: isActiveCamera ? 'transparent' : 'white' }}>
			{address && isLocked && __NODE_ENV__ !== 'development' ? (
				<ValidatePinCode
					title="Unlock your wallet"
					validate={(pinCode) => accountActions.decryptAndWalletAdd(pinCode)}
					onSubmit={() => unlock()}
				/>
			) : (
				<div>
					<div style={{ display: isActiveCamera ? 'none' : 'block' }}>
						{children}
					</div>
					{renderModals()}
					<Toast />
					<Notifications />
					<ScanQrCode />
				</div>
			)}
		</div>
	);
};

App.defaultProps = {
	address: '',
};

App.propTypes = {
	children: PropTypes.element.isRequired,
	isActiveCamera: PropTypes.bool.isRequired,
	isLocked: PropTypes.bool.isRequired,
	address: PropTypes.string,
	unlock: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		isActiveCamera: state.scanQrCode.get('show'),
		isLocked: state.global.get('isLocked'),
		address: state.account.get('address'),
	}),
	(dispatch) => ({
		unlock: () => dispatch(GlobalActions.unlock()),
	}),
)(App);

