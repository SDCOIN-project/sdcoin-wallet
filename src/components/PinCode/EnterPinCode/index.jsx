import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import Button from './../../Form/Button';

const MAX_SYMBOL = 6;

const EnterPinCode = ({
	onBack, title, invalidPinCode, onSubmit,
}) => {
	const [pinCode, setPinCode] = useState([]);

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	const onClickNumber = (number) => {
		const updatedPinCode = [...pinCode];

		updatedPinCode.push(number);
		if (updatedPinCode.length >= MAX_SYMBOL) {
			onSubmit(updatedPinCode.join(''));
			setPinCode([]);
			return;
		}

		setPinCode(updatedPinCode);
	};

	const onDeleteNumber = () => {
		pinCode.pop();
		setPinCode([...pinCode]);
	};

	return (
		<div className="pin-page">
			<a
				href="#"
				onClick={(e) => {
					e.preventDefault();
					onBack();
				}}
				className="pin-page-back-button back-button"
			>
				<div className="back-button__container">
					<i className="is-icon back-button-icon" />
				</div>
				<span className="back-button__text">Back</span>
			</a>
			{/* If you need to show the subtitle you need to uncomment it; add the class "with-subtitle" to the element with className = "pin-page__title with-subtitle" */}
			<div className="pin-page__title with-subtitle">
				<span>{title}</span>
				{/* <div className="pin-page__subtitle">Incorrect PIN. Try again</div> */}
			</div>
			<div className="pin-page__wrapper">
				<div className={`pin-page__password-check ${invalidPinCode ? 'wrong-pin' : ''}`}>
					{new Array(MAX_SYMBOL).fill(0).map((_, key) =>
						// eslint-disable-next-line react/no-array-index-key
						<div key={key} className={`pin-page__password-check-item ${key <= pinCode.length - 1 ? 'is-white' : ''}`} />)
					}
				</div>
				<div className="pin-page__keyboard">
					{numbers.map((number) => (
						<Button key={number} className="pin-page__keyboard-item" onClick={() => onClickNumber(number)}>
							{number}
						</Button>
					))}
				</div>

				{/* one of three options will be displayed */}

				{/* <a href="#" className="pin-page-list__item">
					<i className="is-icon fingerprint-white-icon" />
					<span>You can use Touch ID</span>
				</a> */}

				{/* <a href="#" className="pin-page-list__item">
					<i className="is-icon face-id-white-icon" />
					<span>You can use Face ID</span>
				</a> */}

				<Media query="(max-width: 374px)">
					{(matches) =>
						(matches ? (
							<div className="pin-page-list large-block">
								<div className="pin-page-list__container">
									<span>You can use</span>
									<a href="#" className="pin-page-list__item ">
										<i className="is-icon fingerprint-white-icon" />
									</a>
									<span>or</span>
									<a href="#" className="pin-page-list__item">
										<i className="is-icon face-id-white-icon" />
									</a>
								</div>
							</div>
						) : (
							<div className="pin-page-list large-block">
								<p>Also you can use</p>
								<div className="pin-page-list__container">
									<a href="#" className="pin-page-list__item">
										<i className="is-icon fingerprint-white-icon" />
										<span>Touch ID</span>
									</a>
									<span>or</span>
									<a href="#" className="pin-page-list__item">
										<i className="is-icon face-id-white-icon" />
										<span>Face ID</span>
									</a>
								</div>
							</div>
						))
					}
				</Media>
				<div className="dashboard-controls">
					<Button className="is-transparent is-white pin-page__button" onClick={() => onDeleteNumber()}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);

};

EnterPinCode.propTypes = {
	title: PropTypes.string,
	onBack: PropTypes.func.isRequired,
	invalidPinCode: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
};

EnterPinCode.defaultProps = {
	title: '',
	invalidPinCode: false,
};


export default EnterPinCode;
