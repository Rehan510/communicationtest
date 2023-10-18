import React, { useState } from 'react';
import confirmmesg from '../../../assets/images/confirmmesg.svg';
import InfoDialog from '../newCampaign/CampaignDialog';
import RejectDialog from '../director/RejectedDialog';
import { Form, Input } from 'antd';

import ApproveDialog from './ApproveDialog';
import CampaignStatusDialog from './ChangeCampaignStatusDialog';
import { useSelector, useDispatch } from 'react-redux';
import { setCampaignView } from '../../../reducers/communication';
import { setMessage } from '../../../reducers/campaign';
import { get } from 'lodash';
import axios from 'axios';
import { getDaysName, getFileName } from '../../../utils/helpers';
import { APPROVE, REJECT, PENDING_APPROVAL } from '../../../config/campaignStatusCodes';
import { toast } from 'react-toastify';
const { TextArea } = Input;
const activebuttons = [
	{
		key: 'back',
		label: 'Back',
		className: 'backBtn'
	},
	{
		key: 'inactive',
		label: 'Inactive',
		className: 'backBtn'
	},
	{
		key: 'active',
		label: 'Active',
		className: 'activeBtn'
	}
];
const rejectButtons = [
	{
		key: 'back',
		label: 'Back',
		className: 'backBtn'
	},
	{
		key: 'reject',
		label: 'Reject',
		className: 'backBtn'
	},
	{
		key: 'approve',
		label: 'Approve',
		className: 'activeBtn'
	}
];
const Campaigndetail = () => {
	const { selectedCampaign, message } = useSelector((state) => state.campaignSlice);
	const dispatch = useDispatch();
	//Info dialog
	const [isInfoDialog, setIsInfoDialog] = useState(false);
	//Status dialog
	const [isStatusDialog, setIsStatusDialog] = useState(false);
	//reject dialog
	const [isRejectDialog, setIsRejectDialog] = useState(false);
	//approve dialog
	const [isApproveDialog, setIsApproveDialog] = useState(false);
	const [reason, setReason] = useState(null);
	const [dialogData, setDialogData] = useState(null);
	const [isGoToHome, setIsGoToHome] = useState(false);
	const [isCampaignApproved, setIsCampaignApproved] = useState(false);

	const changeCampaignStatus = async (campaignStatus, activeInd) => {
		let resp = null;
		const data = {
			active: 1,
			inActive: 0
		};
		const payload = {
			campaignId: get(selectedCampaign, 'campaignId', undefined),
			campaignStatusId: campaignStatus ? campaignStatus : undefined,
			comment: reason ? reason : undefined,
			message: message ? message : undefined,
			activeInd: activeInd ? data[activeInd] : undefined
		};
		try {
			resp = await axios.patch('/campaign/update-status', payload);
		} catch (error) {
			resp = null;
		}
		return resp;
	};

	const handleActiveInactive = async (key) => {
		if (key === 'inactive') {
			setIsGoToHome(true);
			const data = await changeCampaignStatus(null, 'inActive');
			if (!get(data, 'data.error', false)) {
				const data = {
					heading: 'Campaign InActivated',
					content: `Campaign ${get(selectedCampaign, 'campaignName', undefined)} has been InActivated successfully`
				};
				setDialogData(data);
				setIsInfoDialog(true);
			}
		}
		if (key === 'active') {
			setIsGoToHome(true);
			const data = await changeCampaignStatus(null, 'active');
			if (!get(data, 'data.error', false)) {
				const data = {
					heading: 'Campaign Activated',
					content: `Campaign  ${get(selectedCampaign, 'campaignName', undefined)} has been activated successfully`
				};
				setDialogData(data);
				setIsInfoDialog(true);
			}
		}
		if (key === 'back') {
			dispatch(setCampaignView('campaignTable'));
		}
	};

	const handleApproveReject = (key) => {
		setIsGoToHome(false);
		switch (key) {
			case 'approve':
				setIsApproveDialog(true);
				break;
			case 'reject':
				setIsGoToHome(true);
				setIsRejectDialog(true);
				setReason(null);
				break;
			case 'back':
				dispatch(setCampaignView('campaignTable'));
				break;
			default:
				break;
		}
	};

	//INFO DIALOG FUNCTIONS

	const handleCloseInfoDialog = () => {
		if (isCampaignApproved) {
			setIsStatusDialog(true);
		}
		if (isGoToHome) {
			dispatch(setCampaignView('campaignTable'));
		}
		setIsInfoDialog(false);
	};

	//APPROVE DIALOG FUNCTIONS

	const handleAprroveDialogAction = async () => {
		const data = await changeCampaignStatus(APPROVE, null);
		if (!get(data, 'data.error', false)) {
			const data = {
				heading: 'Campaign Approved',
				content: `Campaign ${get(selectedCampaign, 'campaignName', undefined)} has been approved successfully`
			};
			setIsApproveDialog(false);
			setDialogData(data);
			setIsCampaignApproved(true);
		}

		setIsInfoDialog(true);
	};

	const handleCloseAprroveDialog = () => {
		setIsApproveDialog(false);
	};

	//REJECT DIALOG FUNCTIONS

	const handleRejectDialogAction = async () => {
		if (!reason) {
			toast.dismiss();
			toast.error('Please Provide Valid Reason Before Rejecting');
			return;
		}
		const data = await changeCampaignStatus(REJECT, null);
		if (!get(data, 'data.error', false)) {
			const data = {
				heading: 'Campaign Rejected Successfully',
				content: `Your campaign has been rejected successfully`
			};
			setIsRejectDialog(false);
			setDialogData(data);
			setIsInfoDialog(true);
		}
	};

	const handleCloseRejectDialog = () => {
		setIsRejectDialog(false);
	};

	//STATUS DIALOG FUNCTIONS
	const handleStatusDialogAction = async (v) => {
		const data = await changeCampaignStatus(APPROVE, v);
		if (!get(data, 'data.error', false)) {
			dispatch(setCampaignView('campaignTable'));
		}
		setIsStatusDialog(false);
	};

	const handleCloseStatusDialog = () => {
		setIsStatusDialog(false);
		dispatch(setCampaignView('campaignTable'));
	};

	const handleReason = (e) => {
		setReason(e.target.value);
	};

	const getCurrentStatus = (status) => {
		let comp = <span></span>;
		if (status === null) {
			return comp;
		}
		if (status) {
			comp = <span className="active">Active</span>;
		} else {
			comp = <span className="InActive">InActive</span>;
		}
		return comp;
	};

	return (
		<div className="director-campaign-wrapper">
			<div className="campaign-Details">
				<div className="img-wrapper">
					<img src={confirmmesg} />
				</div>

				{get(selectedCampaign, 'campaignStatusId', null) === APPROVE ? (
					<div className="detail-heading">
						<label>Confirm Details</label>
						{getCurrentStatus(get(selectedCampaign, 'activeInd', null))}
					</div>
				) : (
					<div style={{ paddingBottom: '24px' }}>Campaign Details</div>
				)}

				<div className="deatils">
					<li>
						<label>Campaign Type</label>
						<span>{get(selectedCampaign, 'campaignType', null)}</span>
					</li>
					<li>
						<label>Campaign Name</label>
						<span>{get(selectedCampaign, 'campaignName', null)} </span>
					</li>
					<li>
						<label>Message Type</label>
						<span>
							{get(selectedCampaign, 'frequency', null).toLowerCase() === 'onetime' ? 'Onetime' : 'Recursive'}
						</span>
					</li>
					<li>
						<label>Starting Date</label>
						<span>{get(selectedCampaign, 'startDate', null)}</span>
					</li>
					{selectedCampaign?.endDate && (
						<li>
							<label>Ending Date</label>
							<span>{get(selectedCampaign, 'endDate', null)}</span>
						</li>
					)}
					{selectedCampaign['executionTime'] && (
						<li>
							<label>Time</label>
							<span>{get(selectedCampaign, 'executionTime', null)}</span>
						</li>
					)}
					{getDaysName(get(selectedCampaign, 'campaignDays', [])).length > 0 && (
						<li>
							<label>Frequency</label>
							<span>{getDaysName(get(selectedCampaign, 'campaignDays', [])).map((v) => v.label + ',')}</span>
						</li>
					)}

					<li>
						<label>Base</label>
						<span>{get(selectedCampaign, 'userType', null)}</span>
					</li>
					{selectedCampaign.file && (
						<li className="media-file">
							<p title={get(selectedCampaign, 'file', null)}>{getFileName(get(selectedCampaign, 'file', null))}</p>
						</li>
					)}
				</div>
				{get(selectedCampaign, 'campaignStatusId', null) === PENDING_APPROVAL ? (
					<div className="text-area">
						<p>Message</p>
						<Form.Item>
							<TextArea
								defaultValue={message}
								value={message}
								className="textArea"
								rows={5}
								placeholder="Type text here"
								maxLength={250}
								onChange={(v) => {
									dispatch(setMessage(v.target.value));
								}}
							/>
						</Form.Item>
					</div>
				) : (
					<div className="mesg-details">
						<label>Message</label>
						<span>{get(selectedCampaign, 'message', null)}</span>
					</div>
				)}

				<div className="details-btn">
					{get(selectedCampaign, 'campaignStatusId', null) === APPROVE && (
						<>
							{activebuttons.map((btn) => {
								return (
									<button onClick={() => handleActiveInactive(btn.key)} className={btn.className} key={btn.key}>
										{btn.label}
									</button>
								);
							})}
						</>
					)}
					{get(selectedCampaign, 'campaignStatusId', null) === PENDING_APPROVAL && (
						<>
							{rejectButtons.map((btn) => {
								return (
									<button onClick={() => handleApproveReject(btn.key)} className={btn.className} key={btn.key}>
										{btn.label}
									</button>
								);
							})}
						</>
					)}
				</div>
				<div className="details-btn">
					<InfoDialog
						heading={get(dialogData, 'heading', null)}
						content={get(dialogData, 'content', null)}
						isShowPopup={isInfoDialog}
						CloseBtn={handleCloseInfoDialog}
					/>
					<RejectDialog
						isOpen={isRejectDialog}
						handleConfirm={handleRejectDialogAction}
						handleClose={handleCloseRejectDialog}
						handleReason={handleReason}
						value={reason}
					/>
					<ApproveDialog
						isOpen={isApproveDialog}
						handleConfirm={handleAprroveDialogAction}
						handleClose={handleCloseAprroveDialog}
					/>
					<CampaignStatusDialog
						isOpen={isStatusDialog}
						handleCampaignStatus={handleStatusDialogAction}
						handleClose={handleCloseStatusDialog}
					/>
				</div>
			</div>
		</div>
	);
};

export default Campaigndetail;
