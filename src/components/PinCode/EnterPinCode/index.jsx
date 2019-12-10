import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Button from './../../Form/Button';

const MAX_SYMBOL = 6;

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const EnterPinCode = ({
	onBack, title, invalidPinCode, onSubmit, loading,
}) => {
	const [pinCode, setPinCode] = useState([]);

	const onClickNumber = (number) => {
		const updatedPinCode = [...pinCode];

		if (loading || updatedPinCode.length >= MAX_SYMBOL) {
			return;
		}

		updatedPinCode.push(number);
		setPinCode(updatedPinCode);

		if (updatedPinCode.length >= MAX_SYMBOL) {
			setTimeout(() => {
				onSubmit(updatedPinCode.join(''));
				setPinCode([]);
			}, 300);
		}
	};

	const onDeleteNumber = () => {
		setPinCode([]);
	};

	return (
		<div className="pin-page show-top-all">
			{onBack ? (
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
				</a>) : null}
			<div className={`pin-page__title ${onBack ? '' : 'pading-top-offset '}`}>
				<span>{title}</span>
			</div>
			<div className="pin-page__wrapper">
				<div className={`pin-page__password-check ${invalidPinCode ? 'wrong-pin' : ''}`}>
					{loading ?
						<i className="loading loading-white-icon" />
						:
						new Array(MAX_SYMBOL).fill(0).map((_, key) =>
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

				<div className="dashboard-controls flex-column">
					<MediaQuery maxWidth={374}>
						{(matches) => {
							if (matches) {
								return (
									<div className="pin-page-list large-block">
										<div className="pin-page-list__container">
											<span>You can use</span>
											<button className="pin-page-list__item ">
												<i className="is-icon fingerprint-white-icon" />
											</button>
											<span>or</span>
											<button className="pin-page-list__item">
												<i className="is-icon face-id-white-icon" />
											</button>
										</div>
									</div>
								);
							}
							return (
								<div className="pin-page-list large-block">
									<p>Also you can use</p>
									<div className="pin-page-list__container">
										<button className="pin-page-list__item">
											<i className="is-icon fingerprint-white-icon" />
											<span>Touch ID</span>
										</button>
										<span>or</span>
										<button className="pin-page-list__item">
											<i className="is-icon face-id-white-icon" />
											<span>Face ID</span>
										</button>
									</div>
								</div>
							);
						}}
					</MediaQuery>
					<Button className={`is-transparent is-white pin-page__button clear-button ${pinCode.length ? '' : 'button-hidden'}`} onClick={() => onDeleteNumber()}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);

};

EnterPinCode.propTypes = {
	title: PropTypes.string,
	onBack: PropTypes.func,
	invalidPinCode: PropTypes.bool,
	loading: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
};

EnterPinCode.defaultProps = {
	title: '',
	invalidPinCode: false,
	loading: false,
	onBack: null,
};


export default EnterPinCode;
