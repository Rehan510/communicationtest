import axios from 'axios';
import { get } from 'lodash';
import { setNotification } from '../../reducers/communication';

export const getNotifications = () => {
	return async (dispatch) => {
		let notifications = [];
		try {
			const response = await axios.get('campaign/notification');
			const error = get(response, 'data.error', true);
			if (!error) {
				notifications = get(response, 'data.data', []);
			}
			dispatch(setNotification(notifications));
		} catch (error) {
			dispatch(setNotification([]));
		}
	};
};
