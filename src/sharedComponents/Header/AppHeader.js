import React, { useEffect, useState } from 'react';
import { Layout, Image } from 'antd';
import { HeaderSearch } from './HeaderSearch';
import HeaderNotification from './HeaderNotification';
import { useSelector } from 'react-redux';
import { isNil, get } from 'lodash';
import profile from '../../assets/images/user.png';

const { Header } = Layout;

const AppHeader = () => {
	const [onScroll, setOnScroll] = useState(false);
	const { loginUser } = useSelector((state) => state.communicationSlice);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setOnScroll(window.scrollY > 16);
		});
	}, []);
	return (
		<Header className={`app-header ${onScroll ? 'sticky' : ''}`}>
			<h1 className="page-title">Campaign Management</h1>
			<div className="header-action">
				<HeaderSearch />
				<HeaderNotification />
				<div className="user-action">
					<div className="avatar-wrap">
						<Image
							width={200}
							className="notificationImg"
							src={isNil(loginUser.imageUrl) ? profile : loginUser.imageUrl}
							preview={{
								src: isNil(loginUser.imageUrl) ? profile : loginUser.imageUrl,
								mask: <span>View</span>
							}}
						/>
					</div>
					<div className="user-info">
						<h3>{get(loginUser, 'communicationUserName', null)}</h3>
						<p>{get(loginUser, 'communicationRole', null)}</p>
					</div>
				</div>
			</div>
		</Header>
	);
};

export default AppHeader;
