import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toast from '../components/Toast';
import { InfoModal } from '../components/Modals';
import Notifications from '../components/Notifications';
import ScanQrCode from '../components/ScanQrCode';

const App = ({ children, isActiveCamera }) => {

	const renderModals = () => (
		<React.Fragment>
			<InfoModal />
		</React.Fragment>
	);

	return (
		<div className="wrapper" style={{ backgroundColor: isActiveCamera ? 'transparent' : 'white' }}>
			<div style={{ display: isActiveCamera ? 'none' : 'block' }}>
				{children}
			</div>
			{renderModals()}
			<Toast />
			<Notifications />
			<ScanQrCode />
		</div>
	);
};

App.propTypes = {
	children: PropTypes.element.isRequired,
	isActiveCamera: PropTypes.bool.isRequired,
};

export default connect(
	(state) => ({
		isActiveCamera: state.scanQrCode.get('show'),
	}),
	() => ({}),
)(App);

