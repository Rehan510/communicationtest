import React from 'react';
import Stages from './Stages';
import CurrentInfo from './CurrentInfo';
import { useDispatch } from 'react-redux';
import { setCampaignView } from '../../../reducers/communication';

const Createcampaign = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(setCampaignView('campaignTable'));
	};

	return (
		<div>
			<CurrentInfo
				handleBack={handleClick}
				label={'Create New Campaign'}
				handlePrev={handleClick}
				previous={'Campaign List'}
				next={'Create New Campaign'}
			/>
			<Stages />
		</div>
	);
};

export default Createcampaign;
