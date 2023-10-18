import React, { useState } from 'react';
import oneloadLogo from '../assets/images/OneloadLogo.svg';
import { Card } from 'antd';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	setIsLoginRequired,
	setLoginUser,
	setIsDirector,
	setIsManager,
	setCampaignView
} from '../reducers/communication';
import axios from 'axios';
import { toast } from 'react-toastify';
import { get } from 'lodash';
const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoginClick, setIsLoginClick] = useState(false);
	const validateMessages = {
		types: {
			email: '${label} is not a valid email!',
			password: '${label} is not a valid number!'
		}
	};
	const login = async (userData) => {
		localStorage.clear();
		setIsLoginClick(true);

		try {
			dispatch(setCampaignView('campaignTable'));
			const resp = await axios.post('/campaign/login', userData);
			const error = get(resp, 'data.error', null);
			if (error) {
				setIsLoginClick(false);
				dispatch(setIsManager(false));
				dispatch(setIsDirector(false));
			}
			if (!error) {
				setIsLoginClick(false);
				const user = get(resp, 'data.data', null);
				const roleToLowerCase = get(user, 'communicationRole', '').toLowerCase();
				localStorage.setItem('cp_token', get(resp, 'data.data.token', null));
				localStorage.setItem('islogin', true);
				if (roleToLowerCase === 'manager') {
					dispatch(setIsManager(true));
					dispatch(setIsDirector(false));
				}
				if (roleToLowerCase === 'director') {
					dispatch(setIsManager(false));
					dispatch(setIsDirector(true));
				}
				delete user.token;
				dispatch(setLoginUser(user));
				localStorage.setItem('user', JSON.stringify(user));
				dispatch(setIsLoginRequired(false));
				navigate('/communication');
			}
		} catch (error) {
			setIsLoginClick(false);
			toast.error(get(error.response, 'data.message', 'something went wrong'));
			dispatch(setIsManager(false));
			dispatch(setIsDirector(false));
		}
	};
	const onFinish = (values) => {
		toast.dismiss();
		if (!values['user']['email']) {
			toast.error('Please enter your email');
			return;
		}
		if (!values['password']) {
			toast.error('Please enter your password');
			return;
		}
		if (values['user']['email'] && values['password']) {
			const userData = {
				communicationUserEmail: get(values, 'user.email', undefined),
				communicationUserPassword: values['password']
			};
			login(userData);
		}
	};
	const [form] = Form.useForm();
	return (
		<>
			<div className="auth-warpper login-page">
				<div className="oneloadLogo">
					<img src={oneloadLogo} />
				</div>
				<div className="input-form">
					<Card>
						<strong>
							Communication <br /> Portal
						</strong>
						<p>If you have an account, please log in with your email address.</p>

						<Form
							form={form}
							layout="vertical"
							name="nest-messages"
							onFinish={(e) => onFinish(e)}
							validateMessages={validateMessages}
						>
							<Form.Item
								name={['user', 'email']}
								label="Email Address"
								rules={[
									{
										type: 'email'
									}
								]}
							>
								<Input placeholder="Enter your email address here" className="field" />
							</Form.Item>
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										type: 'password'
									}
								]}
							>
								<Input.Password placeholder="Enter your password here" className="field" />
							</Form.Item>
							<div>
								<button disabled={isLoginClick} className="login-btn">
									Login
								</button>
							</div>
						</Form>
					</Card>
				</div>
			</div>
		</>
	);
};
export default Login;
