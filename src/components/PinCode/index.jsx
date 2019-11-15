import React from 'react';
import Button from './../Form/Button';

const PinPage = () => (
	<div className="pin-page">
		<a href="#" className="pin-page-back-button back-button">
			<div className="back-button__container">
				<i className="is-icon back-button-icon" />
			</div>
			<span className="back-button__text">Back</span>
		</a>
		<div className="pin-page__title">Create PIN</div>
		<div className="pin-page__wrapper">
			{/* add className "wrong-pin" to make the animation appear */}
			<div className="pin-page__password-check wrong-pin">
				<div className="pin-page__password-check-item is-white" />
				<div className="pin-page__password-check-item" />
				<div className="pin-page__password-check-item" />
				<div className="pin-page__password-check-item" />
				<div className="pin-page__password-check-item" />
				<div className="pin-page__password-check-item" />
			</div>
			<div className="pin-page__keyboard">
				<Button className="pin-page__keyboard-item">1</Button>
				<Button className="pin-page__keyboard-item">2</Button>
				<Button className="pin-page__keyboard-item">3</Button>
				<Button className="pin-page__keyboard-item">4</Button>
				<Button className="pin-page__keyboard-item">5</Button>
				<Button className="pin-page__keyboard-item">6</Button>
				<Button className="pin-page__keyboard-item">7</Button>
				<Button className="pin-page__keyboard-item">8</Button>
				<Button className="pin-page__keyboard-item">9</Button>
				<Button className="pin-page__keyboard-item">0</Button>
			</div>
			<div className="dashboard-page__controls">
				<Button className="is-transparent is-white pin-page__button">Delete</Button>
			</div>
		</div>
	</div>
);

export default PinPage;
