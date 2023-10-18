import React, { useMemo, useRef } from 'react';
import { Form, Input, DatePicker, TimePicker } from 'antd';
import SelectFrequency from './SelectFrequency';
import SelectCampaigntype from './SelectCampaignType';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCampaignName,
	setMessageType,
	setFrequecny,
	setStartDate,
	setEndDate,
	setTime,
	setCampaignDays,
	setSelectedCampaignType,
	setSelectedCustomeBase
} from '../../../reducers/campaign';
import { setCampaignStep, setCampaignView } from '../../../reducers/communication';
import { createCampaign, updateCampaign } from './actionCampaign';
import { frequencyTypes, messageTypes, frequencyDef } from '../../../config/data';
import { DRAFT } from '../../../config/campaignStatusCodes';
import { ADD_MESSAGE } from '../../../config/campaginStagesCodes';
import Moment from 'moment';
import dayjs from 'dayjs';
import { size, get } from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
const Detail = () => {
	const {
		campaignName,
		messageType,
		selectedFrequency,
		selectedCampaignDays,
		startDate,
		endDate,
		time,
		selectedCampaignType,
		selectedCampaign
	} = useSelector((state) => state.campaignSlice);

	const dispatch = useDispatch();
	const dateFormat = 'YYYY-MM-DD';
	const timeFormat = 'HH:mm';
	const formRef = useRef(null);
	const actionsStatus = useMemo(() => {
		let isContinueDisable = true;
		let isDraftDisable = true;
		let timeChek = time;
		if (
			get(selectedCampaignType, 'campaignTypeId', null) === 4 ||
			get(selectedCampaignType, 'campaignTypeId', null) === 5
		) {
			timeChek = true;
		}
		let fields = [campaignName, selectedCampaignType, startDate, timeChek];
		let frequencyCheck = selectedFrequency === 'everyDay' ? true : size(selectedCampaignDays);
		fields = messageType === 'onetime' ? fields : [...fields, endDate, frequencyCheck];
		isContinueDisable = fields.some((check) => !check);
		isDraftDisable = fields.every((check) => !check);
		return { isContinueDisable, isDraftDisable };
	}, [
		campaignName,
		messageType,
		selectedFrequency,
		selectedCampaignDays,
		selectedCampaignType,
		time,
		startDate,
		endDate,
		selectedFrequency
	]);

	const handleCampaignName = (v) => {
		dispatch(setCampaignName(v.target.value));
	};
	const handleMessageType = (v) => {
		formRef.current.setFieldValue('Endingdate', null);
		dispatch(setEndDate(null));
		dispatch(setMessageType(v.target.value));
		dispatch(setFrequecny('everyDay'));
		dispatch(setCampaignDays([]));
	};
	const handleFrequencyType = (v) => {
		dispatch(setFrequecny(v.target.value));
		dispatch(setCampaignDays([]));
	};
	const handleStartDate = (v) => {
		let date = dayjs(v).format(dateFormat);
		if (!v) {
			date = null;
		}
		dispatch(setStartDate(date));
	};
	const handleEndDate = (v) => {
		let date = dayjs(v).format(dateFormat);
		if (!v) {
			date = null;
		}
		dispatch(setEndDate(date));
	};
	const handleTime = (v) => {
		let time = dayjs(v).format(timeFormat);
		if (!v) {
			time = null;
		}
		dispatch(setTime(time));
	};
	const disabledDate = (current) => {
		let data = false;
		if (current && current <= Moment().startOf('day')) {
			data = true;
		}
		if (current && current >= Moment().add(6, 'months')) {
			data = true;
		}
		return data;
	};

	const handleCampaignDays = (v) => {
		let days = [];
		if (selectedCampaignDays.includes(v)) {
			days = selectedCampaignDays.filter((d) => d !== v);
		} else {
			days = [...selectedCampaignDays, v];
		}
		dispatch(setCampaignDays(days));
	};
	const handleContinue = () => {
		dispatch(setCampaignStep(ADD_MESSAGE));
	};
	const handleDraft = () => {
		if (get(selectedCampaign, 'campaignId', false)) {
			dispatch(updateCampaign(DRAFT, 'Your draft campaign is updated', setCampaignView('campaignTable')));
		} else {
			dispatch(createCampaign(DRAFT, false, 'Your campaign saved as draft', setCampaignView('campaignTable')));
		}
	};
	const handleCampaignType = (a, v) => {
		formRef.current.setFieldValue('time', null);
		dispatch(setTime(null));
		dispatch(setSelectedCampaignType(v['data']));
		dispatch(setSelectedCustomeBase(null));
	};
	const handleDeleteCampaign = async (id) => {
		toast.dismiss();
		if (!id) {
			return;
		}
		try {
			const resp = await axios.delete(`campaign/delete/${id}`);
			const error = get(resp, 'data.error', false);
			if (!error) {
				toast.success('Campaign deleted');
				dispatch(setCampaignView('campaignTable'));
			} else {
				toast.error(get(resp, 'data.message', 'something went wrong'));
			}
		} catch (error) {
			toast.error(get(error, 'message', 'something went wrong'));
		}
	};

	const DraftStatusBtn = () => {
		return (
			<>
				<button className="daraft-status" onClick={() => dispatch(setCampaignView('campaignTable'))}>
					Cancel
				</button>

				<button
					className="daraft-status"
					onClick={() => handleDeleteCampaign(get(selectedCampaign, 'campaignId', null))}
				>
					Delete
				</button>

				<button
					className={`savedraft ${actionsStatus['isDraftDisable'] ? 'conti-btn' : ' save-btn'}`}
					disabled={actionsStatus['isDraftDisable']}
					onClick={() => {
						handleDraft();
					}}
				>
					Save as Draft
				</button>
				<button
					className={`continue ${actionsStatus['isContinueDisable'] ? 'conti-btn' : ' save-btn'}`}
					onClick={() => {
						handleContinue();
					}}
					disabled={actionsStatus['isContinueDisable']}
				>
					Continue
				</button>
			</>
		);
	};

	const ActionButtons = () => {
		return (
			<>
				<button className="cancel-btn" onClick={() => dispatch(setCampaignView('campaignTable'))}>
					Cancel
				</button>
				<button
					className={actionsStatus['isDraftDisable'] ? 'conti-btn' : ' save-btn'}
					disabled={actionsStatus['isDraftDisable']}
					onClick={() => {
						handleDraft();
					}}
				>
					Save as Draft
				</button>
				<button
					className={actionsStatus['isContinueDisable'] ? 'conti-btn' : 'save-btn'}
					onClick={() => {
						handleContinue();
					}}
					disabled={actionsStatus['isContinueDisable']}
				>
					Continue
				</button>
			</>
		);
	};
	return (
		<>
			<div className="details-form">
				<h1>Campaign details</h1>
				<Form ref={formRef} name="validateOnly" layout="vertical" autoComplete="off">
					<SelectCampaigntype handleChange={handleCampaignType} />
					<Form.Item
						name="Campaign Name"
						label="Campaign Name"
						type="string"
						rules={[
							{
								required: true
							},
							{
								min: 3,
								max: 25
							}
						]}
					>
						<Input
							maxLength={25}
							defaultValue={campaignName}
							onChange={(v) => handleCampaignName(v)}
							placeholder="Enter campaign name here"
							className="detailsInput"
						/>
					</Form.Item>

					<Form.Item
						name="name"
						label="Message Type"
						rules={[
							{
								required: true
							}
						]}
					>
						{messageTypes.map((message, index) => {
							return (
								<React.Fragment key={`days${index}`}>
									<input
										type="radio"
										className="deatils-readio"
										onChange={(v) => handleMessageType(v)}
										id={message['value']}
										name={message['name']}
										value={message['value']}
										checked={message['value'] === messageType ? true : false}
									/>
									<label className="radio">{message['name']}</label>
								</React.Fragment>
							);
						})}
					</Form.Item>
					<Form.Item
						name="Starting Date"
						label="Starting Date"
						rules={[
							{
								required: true
							}
						]}
					>
						<DatePicker
							disabledDate={disabledDate}
							value={startDate ? dayjs(startDate, dateFormat) : ''}
							defaultValue={startDate ? dayjs(startDate, dateFormat) : ''}
							format={dateFormat}
							popupClassName="salman"
							className="detailsInput"
							placeholder="Enter Starting Date"
							onChange={(date) => handleStartDate(date)}
						/>
					</Form.Item>

					{messageType !== 'onetime' && (
						<Form.Item
							name="Ending Date"
							label="Ending Date"
							rules={[
								{
									required: true
								}
							]}
						>
							<DatePicker
								value={endDate ? dayjs(endDate, dateFormat) : ''}
								defaultValue={endDate ? dayjs(endDate, dateFormat) : ''}
								format={dateFormat}
								disabledDate={disabledDate}
								className="detailsInput"
								placeholder="Enter Ending Date"
								onChange={(date) => handleEndDate(date)}
							/>
						</Form.Item>
					)}
					{get(selectedCampaignType, 'campaignTypeId', null) !== 4 &&
						get(selectedCampaignType, 'campaignTypeId', null) !== 5 && (
							<Form.Item
								name="Time"
								label="Time"
								rules={[
									{
										required: true
									}
								]}
							>
								<TimePicker
									defaultValue={time ? dayjs(time, timeFormat) : null}
									value={time ? dayjs(time, timeFormat) : null}
									format={timeFormat}
									className="detailsInput"
									onChange={(t) => handleTime(t)}
								/>
							</Form.Item>
						)}

					{messageType !== 'onetime' && (
						<Form.Item
							name="Frequency"
							label="Frequency"
							rules={[
								{
									required: true
								}
							]}
						>
							{frequencyTypes.map((message, index) => {
								return (
									<React.Fragment key={`days${index}`}>
										<input
											type="radio"
											className="deatils-readio"
											onChange={(v) => handleFrequencyType(v)}
											id={message['value']}
											name={message['name']}
											value={message['value']}
											checked={message['value'] === selectedFrequency ? true : false}
										/>
										<label className="radio">{message['name']}</label>
									</React.Fragment>
								);
							})}
						</Form.Item>
					)}
				</Form>
				{messageType !== 'onetime' && (
					<>
						{' '}
						{selectedFrequency !== 'everyDay' && (
							<SelectFrequency
								frequencyData={frequencyDef[selectedFrequency]}
								handleCampaignDays={handleCampaignDays}
								selectedCampaignDays={selectedCampaignDays}
							/>
						)}
					</>
				)}

				<div className="details-btn">
					{get(selectedCampaign, 'campaignStatusId', null) === DRAFT ? <DraftStatusBtn /> : <ActionButtons />}
				</div>
			</div>
		</>
	);
};
export default Detail;
