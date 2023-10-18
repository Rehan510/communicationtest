import axios from 'axios';
// import { refreshToken } from '../utils/helpers';
import config from '../config/config';
import { get } from 'lodash';
export default {
	initalise: () => {
		axios.defaults.baseURL = config.apiUrl;

		// axios.defaults.withCredentials = true
		// Request Interceptor. All Request pass from here
		// headers: { Authorization: `Bearer ${token}` }
		axios.interceptors.request.use(
			(axiosConfig) => {
				let authToken = localStorage.getItem('cp_token');

				// axiosConfig.headers['userCredentials'] = 'MDMxNDQwMDczMDA6ZXBAMTQ2OTA=';
				if (authToken) {
					axiosConfig.headers['Authorization'] = `Bearer ${authToken}`;
				}
				axiosConfig.headers['Content-Type'] = 'application/json';
				return axiosConfig;
			},
			(error) => {
				Promise.reject(error);
			}
		);

		/*
                    Response Interceptor
                    Responsibilities:
                    1- If api sends new token then change the store auth token with new token
                    2- If api sends 401 token then send user to login page
                */

		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			function (error) {
				if (get(error, 'response.status', '') === 401) {
					localStorage.clear();
					const path = window.location.pathname;
					if (path !== `/${config.appUrl}/login`) {
						window.location.href = `/${config.appUrl}/login`;
					}
				} else {
					return Promise.reject(error);
				}
			}
		);
	}
};
