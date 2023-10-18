import React from 'react';
import CampaignDetails from './newCampaign/CampaignDetails';
import CurrentInfo from '../campaignManagement/newCampaign/CurrentInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignView } from '../../reducers/communication';
import DirectorCampaignDetail from '../campaignManagement/director/CampaignDetail';
import { get } from 'lodash';
import { getDaysName } from '../../utils/helpers';

const Campaigndetail = () => {
	const dispatch = useDispatch();
	const { isDirector } = useSelector((state) => state.communicationSlice);
	const { selectedCampaign } = useSelector((state) => state.campaignSlice);
	const handleClick = () => {
		dispatch(setCampaignView('campaignTable'));
	};

	const messageType = get(selectedCampaign, 'frequency', null) !== 'ONETIME' ? 'recursive' : 'onetime';
	const ManagerCampaign = () => {
		return (
			<section className="campaign-details-wrapper">
				<div className="created-campaign-wrapper">
					<strong>Campaign Details</strong>
					<CampaignDetails
						campaignType={get(selectedCampaign, 'campaignType', null)}
						campaignName={get(selectedCampaign, 'campaignName', null)}
						messageType={messageType}
						startDate={get(selectedCampaign, 'startDate', null)}
						endDate={get(selectedCampaign, 'endDate', null)}
						time={get(selectedCampaign, 'executionTime', null)}
						frequency={getDaysName(get(selectedCampaign, 'campaignDays', []))}
						base={get(selectedCampaign, 'userType', null)}
						msg={get(selectedCampaign, 'message', null)}
						file={get(selectedCampaign, 'file', null)}
					/>
				</div>
			</section>
		);
	};
	return (
		<>
			<CurrentInfo
				handleBack={handleClick}
				label={get(selectedCampaign, 'campaignName', null)}
				handlePrev={handleClick}
				previous={'Campaign List'}
				next={'Campaign Details'}
			/>
			<>{isDirector ? <DirectorCampaignDetail /> : <ManagerCampaign />}</>
		</>
	);
};

export default Campaigndetail;
