import React from 'react';
import CampaignType from './CampaignType';
import CampaignStatus from './CampaignStatus';
import DatePicker from './DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignView, setCampaignStep } from '../../../reducers/communication';
import { resetCampaign } from '../../../reducers/campaign';
import { ADD_DETAIL } from '../../../config/campaginStagesCodes';
const Tablefilters = ({ resetPagination }) => {
	const dispatch = useDispatch();
	const { isManager } = useSelector((state) => state.communicationSlice);
	const hanldeCreateCampaign = () => {
		dispatch(setCampaignView('newCampaign'));
		dispatch(setCampaignStep(ADD_DETAIL));
		dispatch(resetCampaign());
	};
	return (
		<div className="table-filter">
			<DatePicker resetPagination={resetPagination} />
			<CampaignStatus resetPagination={resetPagination} />
			<CampaignType resetPagination={resetPagination} />
			{isManager && (
				<button
					className="create-button"
					onClick={() => {
						hanldeCreateCampaign();
					}}
				>
					Create Campaign
				</button>
			)}
		</div>
	);
};

export default Tablefilters;
