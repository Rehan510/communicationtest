import React, { useState } from 'react';
import CampaignDetail from './CampaignDetails';
import confirmmesg from '../../../assets/images/confirmmesg.svg';
import ConfirmBtn from './ConfirmBtn';
import CampaignDialog from './CampaignDialog';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { getDaysName } from '../../../utils/helpers';
import { createCampaign, updateCampaign } from './actionCampaign';
import { resetCampaign } from '../../../reducers/campaign';
import { setCampaignStep, setCampaignView } from '../../../reducers/communication';
import { ADD_MESSAGE } from '../../../config/campaginStagesCodes';
import { DRAFT, PENDING_APPROVAL } from '../../../config/campaignStatusCodes';

const Confirmation = () => {
	const [confirmDialog, setConfirmDialog] = useState({
		open: false,
		message: 'Your campaign request has been sent for approval',
		heading: 'Campaign Request Submitted'
	});
	// const { campaignStatus } = useSelector((state) => state.communicationSlice);
	const {
		selectedCampaignType,
		campaignName,
		messageType,
		startDate,
		endDate,
		time,
		selectedCampaignDays,
		selectedCustomeBase,
		message,
		fileDetail,
		selectedFrequency,
		selectedCampaign
	} = useSelector((state) => state.campaignSlice);
	const dispatch = useDispatch();
	const handleClick = (btn) => {
		if (btn['key'] === 'submit') {
			if (get(selectedCampaign, 'campaignId', false)) {
				dispatch(updateCampaign(PENDING_APPROVAL, null, null, setConfirmDialog));
			} else {
				dispatch(createCampaign(PENDING_APPROVAL, setConfirmDialog));
			}
		}
		if (btn['key'] === 'cancel') {
			dispatch(setCampaignView('campaignTable'));
		}
		if (btn['key'] === 'back') {
			dispatch(setCampaignStep(ADD_MESSAGE));
		}
		if (btn['key'] === 'draft') {
			if (get(selectedCampaign, 'campaignId', false)) {
				dispatch(updateCampaign(DRAFT, 'Your draft campaign is updated', setCampaignView('campaignTable')));
			} else {
				dispatch(createCampaign(DRAFT, false, 'Your campaign saved as draft', setCampaignView('campaignTable')));
			}
		}
	};
	const handleClose = () => {
		setConfirmDialog(false);
		dispatch(resetCampaign());
		dispatch(setCampaignView('campaignTable'));
	};

	return (
		<div className="confirm-wrapper">
			<img src={confirmmesg} />
			<div className="rejected-details">
				<strong>Confirm Details</strong>
				<CampaignDetail
					campaignType={get(selectedCampaignType, 'description', null)}
					campaignName={campaignName}
					messageType={messageType}
					startDate={startDate}
					endDate={endDate}
					time={time}
					frequency={getDaysName(selectedCampaignDays, selectedFrequency)}
					base={get(selectedCustomeBase, 'description', null)}
					msg={message}
					file={get(fileDetail, 'name', null)}
				/>
				<ConfirmBtn handleClick={handleClick} />
			</div>
			<CampaignDialog
				CloseBtn={handleClose}
				heading={get(confirmDialog, 'heading', 'Campaign Request Submitted')}
				content={get(confirmDialog, 'message', 'Your campaign request has been sent for approval')}
				isShowPopup={get(confirmDialog, 'open', false)}
				setIsShowPopup={setConfirmDialog}
			/>
		</div>
	);
};

export default Confirmation;
