import axios from 'axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { resetCampaign } from '../../../reducers/campaign';
import { frequencyKey } from '../../../config/data';

export const createCampaign = (campaignStatus, setStatus, toastMsg, redirect) => {
	return async (dispatch, getState) => {
		toast.dismiss();
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
			selectedFrequency
		} = getState().campaignSlice;
		const { campaignStep } = getState().communicationSlice;
		const frequency = messageType === 'onetime' ? 'ONETIME' : frequencyKey[selectedFrequency];
		const campaignDays =
			messageType === 'onetime'
				? undefined
				: selectedCampaignDays.map((v) => {
						return {
							day: v
						};
				  });
		const payload = {
			campaignName: campaignName ? campaignName : undefined,
			campaignTypeId: get(selectedCampaignType, 'campaignTypeId', undefined),
			userTypeId: get(selectedCustomeBase, 'userTypeId', undefined),
			campaignStatusId: campaignStatus ? campaignStatus : undefined,
			frequency: frequency ? frequency : undefined,
			startDate: startDate ? startDate : undefined,
			endDate: endDate ? endDate : undefined,
			executionTime: time ? time : undefined,
			message: message ? message : undefined,
			file: fileDetail ? fileDetail.name : undefined,
			savedStep: campaignStep ? campaignStep : undefined,
			campaignDays: campaignDays
		};

		try {
			const response = await axios.post('/campaign/add', payload);
			const error = get(response, 'data.error', true);
			if (!error) {
				setStatus &&
					setStatus({
						open: true,
						message: 'Your campaign request has been sent for approval',
						heading: 'Campaign Request Submitted'
					});
				if (toastMsg) {
					toast.success(toastMsg);
					dispatch(redirect);
				}
			} else {
				setStatus &&
					setStatus({
						open: true,
						message: get(response, 'data.message', 'something went wrong'),
						heading: 'Campaign Request Not Submitted'
					});
				if (toastMsg) {
					toast.error(get(response, 'data.message', 'something went wrong'));
				}
			}
		} catch (error) {
			toast.error(get(error, 'response.message', 'something went wrong'));
		}
	};
};

export const updateCampaign = (campaignStatus, toastMsg, redirect, setStatus) => {
	return async (dispatch, getState) => {
		toast.dismiss();
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
		} = getState().campaignSlice;
		const { campaignStep } = getState().communicationSlice;
		const frequency = messageType === 'onetime' ? 'ONETIME' : frequencyKey[selectedFrequency];
		const campaignDays =
			messageType === 'onetime'
				? undefined
				: selectedCampaignDays.map((v) => {
						return {
							day: v
						};
				  });
		const payload = {
			...selectedCampaign,
			campaignId: get(selectedCampaign, 'campaignId', undefined),
			campaignName: campaignName ? campaignName : undefined,
			campaignTypeId: get(selectedCampaignType, 'campaignTypeId', undefined),
			userTypeId: get(selectedCustomeBase, 'userTypeId', undefined),
			campaignStatusId: campaignStatus ? campaignStatus : undefined,
			frequency: frequency ? frequency : undefined,
			startDate: startDate ? startDate : undefined,
			endDate: endDate ? endDate : undefined,
			executionTime: time ? time : time,
			message: message ? message : undefined,
			file: fileDetail ? fileDetail.name : undefined,
			savedStep: campaignStep ? campaignStep : undefined,
			campaignDays: campaignDays
		};
		try {
			const response = await axios.put('/campaign/update', payload);
			const error = get(response, 'data.error', true);
			if (!error) {
				dispatch(resetCampaign());
				setStatus &&
					setStatus({
						open: true,
						message: 'Your campaign request has been sent for approval',
						heading: 'Campaign Request Submitted'
					});
				if (toastMsg) {
					toast.success(toastMsg);
					dispatch(redirect);
				}
			} else {
				setStatus &&
					setStatus({
						open: true,
						message: get(response, 'data.message', 'something went wrong'),
						heading: 'Campaign Request Not Submitted'
					});
				if (toastMsg) {
					toast.error(get(response, 'data.message', 'something went wrong'));
				}
			}
		} catch (error) {
			toast.error(get(error, 'response.message', 'something went wrong'));
		}
	};
};
