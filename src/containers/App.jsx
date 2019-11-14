import React from 'react';
import PropTypes from 'prop-types';

import Toast from '../components/Toast';
import { InfoModal } from '../components/Modals';

const App = ({ children }) => {

	const renderModals = () => (
		<React.Fragment>
			<InfoModal />
		</React.Fragment>
	);

	return (
		<div className="wrapper">
			{children}
			{renderModals()}
			<Toast />
		</div>
	);
};

App.propTypes = {
	children: PropTypes.element.isRequired,
};

export default App;
