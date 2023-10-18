import React from 'react';
import { Tabs } from 'antd';
import CampaignList from './Table';
import UnderDevelopment from '../../sharedComponents/Information/UnderDevelopment';
const CompaignTabs = () => {
	const onChange = () => {};

	const items = [
		{
			key: '1',
			label: `Campaign List`,
			children: <CampaignList />
		},
		{
			key: '2',
			label: `Trigger Notifications`,
			children: <UnderDevelopment />
		}
	];

	return (
		<div className="tabs-wrapper">
			<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
		</div>
	);
};

export default CompaignTabs;
