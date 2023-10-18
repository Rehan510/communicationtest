import React from 'react';
import { Layout } from 'antd';
import chatActiveIcon from '../../assets/images/sidebar/icon-chat.svg';
import chatIcon from '../../assets/images/sidebar/chat.svg';

import logoutIcon from '../../assets/images/Group.svg';
import oneloadLogo from '../../assets/images/OneloadLogo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab, setIsLoginRequired, setCampaignView } from '../../reducers/communication';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const AppSidebar = () => {
	const { selectedTab } = useSelector((state) => state.communicationSlice);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sideBarTabs = [
		{
			name: 'Campaign Management',
			key: 'campaign',
			icon: { active: chatActiveIcon, inActive: chatIcon },
			to: '/communication',
			view: 'campaignTable'
		}
	];
	const handleSideBarTabs = (tab) => {
		dispatch(setCampaignView(tab['view']));
		dispatch(setSelectedTab(tab['key']));
		navigate(tab['to']);
		window.location.reload();
	};
	const handleLogout = () => {
		localStorage.clear();
		dispatch(setIsLoginRequired(true));
	};
	return (
		<Sider trigger={null} collapsible collapsed={false} style={{ height: '100vh' }}>
			<div className="demo-logo-vertical" />
			<div className="oneload-logo">
				<img src={oneloadLogo} />
			</div>
			<div className="sidebar">
				{sideBarTabs.map((tabs, index) => (
					<span
						onClick={() => {
							handleSideBarTabs(tabs);
						}}
						key={`tabs${index}`}
						className={`nav-item ${tabs.key === selectedTab ? 'active' : ''}`}
					>
						<span className="icon-wrap">
							<img src={tabs.key === selectedTab ? tabs.icon['active'] : tabs.icon['inActive']} alt="icon chat" />
						</span>
						{tabs.name}
					</span>
				))}
				<span
					onClick={() => {
						handleLogout();
					}}
					className={`nav-item`}
				>
					<span className="icon-wrap">
						<img src={logoutIcon} alt="icon chat" />
					</span>
					Logout
				</span>
			</div>
		</Sider>
	);
};

export default AppSidebar;
