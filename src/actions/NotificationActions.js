import React from 'react';
import randomString from 'randomstring';

import GetPaymentButton from './../components/Notifications/Buttons/GetPayment';
import NotificationReducer from '../reducers/NotificationReducer';
import BaseActions from './BaseActions';
import { ICONS } from '../constants/NotificationConstants';

class NotificationActions extends BaseActions {

	add({
		text, icon, closeCallback, className, button, buttonCallback,
	}) {
		return (dispatch) => {

			if (icon && !Object.values(ICONS).includes(icon)) {
				throw new Error('Invalid icon');
			}

			dispatch(this.reducer.actions.add({
				id: randomString.generate(10),
				text,
				icon,
				closeCallback,
				className,
				button,
				buttonCallback,
			}));
		};
	}

	errorNotification({
		text, closeCallback, className, button, buttonCallback,
	}) {
		return (dispatch) => {
			dispatch(this.add({
				text: `Error: ${text}`,
				closeCallback,
				className,
				button,
				buttonCallback,
			}));
		};
	}

	infoNotification({
		text, closeCallback, className, button, buttonCallback,
	}) {
		return (dispatch) => {
			dispatch(this.add({
				text,
				icon: ICONS.attention,
				closeCallback,
				className,
				button,
				buttonCallback,
			}));
		};
	}

	getPaymentNotification({
		text, closeCallback, className, buttonCallback,
	}) {
		return (dispatch) => {
			const id = randomString.generate(10);

			dispatch(this.reducer.actions.add({
				id,
				text,
				icon: ICONS.bell,
				closeCallback,
				className,
				button: <GetPaymentButton id={id} buttonCallback={buttonCallback} />,
			}));
		};
	}

	delete(id) {
		return (dispatch) => {
			dispatch(this.reducer.actions.delete({ id }));
		};
	}

}

export default new NotificationActions(NotificationReducer);
