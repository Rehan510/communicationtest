import React, { useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignStatus, setCampaignTypes } from '../reducers/communication';
import { setSelectedUserBase } from '../reducers/campaign';
import { DRAFT } from '../config/campaignStatusCodes';

const Cache = () => {
	const dispatch = useDispatch();
	const { isDirector } = useSelector((state) => state.communicationSlice);
	const getCampaignStatus = useCallback(async () => {
		let resp = [];

		try {
			const data = await axios.get(`campaign/status`);
			const error = get(data, 'data.error', true);
			if (!error) {
				resp = get(data, 'data.data', []);
			}
			if (isDirector) {
				resp = resp.filter((v) => v.campaignStatusId !== DRAFT);
			}
			dispatch(setCampaignStatus(resp));
		} catch (error) {
			dispatch(setCampaignStatus([]));
		}
	}, [dispatch, isDirector]);

	const getCampaignType = useCallback(async () => {
		let resp = [];
		try {
			const data = await axios.get(`campaign/types`);
			const error = get(data, 'data.error', true);
			if (!error) {
				resp = get(data, 'data.data', []);
			}
			dispatch(setCampaignTypes(resp));
		} catch (error) {
			dispatch(setCampaignTypes([]));
		}
	}, [dispatch]);
	const getUserType = useCallback(async () => {
		let resp = [];
		try {
			const data = await axios.get(`campaign/user-types`);
			const error = get(data, 'data.error', true);
			if (!error) {
				resp = get(data, 'data.data', []);
			}

			dispatch(setSelectedUserBase(resp));
		} catch (error) {
			dispatch(setSelectedUserBase([]));
		}
	}, [dispatch]);

	useEffect(() => {
		getCampaignStatus();
		getCampaignType();
		getUserType();
	}, [getCampaignStatus, getCampaignType, getUserType]);

	return <></>;
};

export default memo(Cache);
