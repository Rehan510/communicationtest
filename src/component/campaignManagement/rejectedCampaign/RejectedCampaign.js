import React, { useRef, useCallback } from 'react';
import { Select, Form, Input, DatePicker, Upload, TimePicker, Space } from 'antd';
import RejectedCompaignType from './RejectedCompaignType';
import Moment from 'moment';
import {
	setFrequecny,
	setCampaignName,
	setMessageType,
	setStartDate,
	setEndDate,
	setTime,
	setMessage,
	setSelectedCustomeBase,
	setFileDetail,
	setCampaignDays,
	setSelectedCampaignType
} from '../../../reducers/campaign';
import Uploadicon from '../../../assets/images/Upload.svg';
import Crossicon from '../../../assets/images/Cross.svg';
import { messageTypes, frequencyTypes, frequencyDef } from '../../../config/data';
import { useDispatch, useSelector } from 'react-redux';
import RejectFrequency from './RejectFrequency';
import Button from '../newCampaign/Button';
import { updateCampaign } from '../newCampaign/actionCampaign';
import CurrentInfo from '../newCampaign/CurrentInfo';
import { setCampaignView } from '../../../reducers/communication';
import dayjs from 'dayjs';
import { get } from 'lodash';
import config from '../../../config/config';
import { FLASH_POP_UP, SUCCESSFUL_COMPLETION, NEWS_UPDATES } from '../../../config/campaignTypesCodes';
import { ALL_CONSUMER_BASE, CUSTOM_BASE } from '../../../config/campaignUserTypesCodes';

const Rejectedcampaign = () => {
	const { Option } = Select;
	const { TextArea } = Input;
	const dispatch = useDispatch();

	const {
		userTypesBase,
		selectedFrequency,
		fileDetail,
		campaignName,
		messageType,
		startDate,
		endDate,
		time,
		selectedCustomeBase,
		message,
		selectedCampaign,
		selectedCampaignDays,
		selectedCampaignType
	} = useSelector((state) => state.campaignSlice);

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
	const dateFormat = 'YYYY-MM-DD';
	const timeFormat = 'HH:mm';
	const formRef = useRef(null);

	const handleFrequencyType = (v) => {
		dispatch(setFrequecny(v.target.value));
		dispatch(setCampaignDays([]));
	};
	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'application/vnd.ms-excel' || file.type === 'text/csv';
		if (!isJpgOrPng) {
			message.error('You can only upload .xlsv/csv file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 5;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	const handleBtnClick = () => {
		dispatch(setCampaignView('campaignTable'));
	};

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
	const handleStartDate = (v) => {
		dispatch(setStartDate(dayjs(v).format(dateFormat)));
	};
	const handleEndDate = (v) => {
		dispatch(setEndDate(dayjs(v).format(dateFormat)));
	};
	const handleTime = (v) => {
		dispatch(setTime(dayjs(v).format(timeFormat)));
	};

	const handleChange = (value, base) => {
		dispatch(setFileDetail(null));

		dispatch(setSelectedCustomeBase(base['data']));
	};
	const handleFileChange = (info) => {
		if (info.file.status === 'uploading') {
			return;
		}
		if (info.file.status === 'done') {
			dispatch(setFileDetail({ name: get(info.file, 'response.data.fileName', null), status: true }));
			getBase64(info.file.originFileObj, () => {});
		}
	};
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};
	const handleFile = () => {
		dispatch(setFileDetail(null));
	};

	const handleCancel = () => {
		handleBtnClick();
	};
	const handleSubmit = () => {
		if (get(selectedCampaign, 'campaignId', false)) {
			dispatch(updateCampaign(2, 'your campaign successfuly submited', setCampaignView('campaignTable')));
		}
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
	const handleRejectedCampaignType = (a, v) => {
		formRef.current.setFieldValue('time', null);
		dispatch(setTime(null));
		dispatch(setSelectedCampaignType(v['data']));
		dispatch(setSelectedCustomeBase(null));
	};

	const headers = { Authorization: `Bearer ${localStorage.getItem('cp_token')}` };
	const getUserBase = useCallback(() => {
		let data = userTypesBase;
		if ([FLASH_POP_UP, SUCCESSFUL_COMPLETION].includes(get(selectedCampaignType, 'campaignTypeId', false))) {
			data = userTypesBase.filter((ty) => ty['userTypeId'] !== CUSTOM_BASE);
		}
		if ([NEWS_UPDATES].includes(get(selectedCampaignType, 'campaignTypeId', false))) {
			data = userTypesBase.filter((ty) => ty['userTypeId'] !== ALL_CONSUMER_BASE);
		}
		return data;
	}, [selectedCampaignType, userTypesBase]);
	return (
		<>
			<CurrentInfo
				handleBack={handleBtnClick}
				label={'Create New Campaign'}
				handlePrev={handleBtnClick}
				previous={'Campaign List'}
				next={'Create New Campaign'}
			/>
			<div className="rejected-wrapper">
				<div className="details-wrapper">
					<Form ref={formRef} name="validateOnly" layout="vertical" autoComplete="off">
						<RejectedCompaignType handleChange={handleRejectedCampaignType} />
						<Form.Item
							name="Campaig Name"
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
							name="Startingdate"
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
								name="Endingdate"
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
									name="time"
									label="Time"
									rules={[
										{
											required: true
										}
									]}
								>
									<TimePicker
										defaultValue={time ? dayjs(time, timeFormat) : ''}
										value={time ? dayjs(time, timeFormat) : ''}
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
										<React.Fragment key={`fre${index}`}>
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
						{messageType !== 'onetime' && selectedFrequency !== 'everyDay' && (
							<RejectFrequency
								frequencyData={frequencyDef[selectedFrequency]}
								handleCampaignDays={handleCampaignDays}
								selectedCampaignDays={selectedCampaignDays}
							/>
						)}
					</Form>
					<div className="register add-message-form">
						<div className="form-wrapper">
							<div className="form-data">
								<div className="base-select">
									<p>Base</p>
									<Select
										size="large"
										placeholder="Select Base"
										className="detailsInput"
										defaultValue={get(selectedCustomeBase, 'userTypeId', null)}
										value={get(selectedCustomeBase, 'userTypeId', null)}
										popupClassName="select-compaign"
										onChange={handleChange}
									>
										{getUserBase()?.map((data, index) => {
											return (
												<Option key={`type${index}`} value={data['userTypeId']} label={data['description']} data={data}>
													<Space>{data['description']}</Space>
												</Option>
											);
										})}
									</Select>
								</div>

								<div className="text-area">
									<p>Message</p>
									<Form.Item>
										<TextArea
											className="textArea"
											defaultValue={message}
											value={message}
											rows={4}
											placeholder="Type text here"
											maxLength={250}
											onChange={(v) => {
												dispatch(setMessage(v.target.value));
											}}
										/>
									</Form.Item>
								</div>

								{get(selectedCustomeBase, 'userTypeId', null) === 9 && !fileDetail && (
									<div className="form-dragger">
										<p>Upload Custom Base File</p>
										<Form.Item className="main-upload">
											<Form.Item name="dragger" valuePropName="fileList" noStyle>
												<Upload.Dragger
													name="files"
													headers={headers}
													action={`${config.apiUrl}/campaign/media`}
													beforeUpload={beforeUpload}
													onChange={handleFileChange}
												>
													<p className="ant-upload-drag-icon">
														<img src={Uploadicon} alt="upload" />
													</p>
													<p className="ant-upload-text">
														Click to upload <span>or drag and drop</span>
													</p>
													<p className="ant-upload-hint">.xlsv or .csv</p>
												</Upload.Dragger>
											</Form.Item>
										</Form.Item>
									</div>
								)}
								{fileDetail && (
									<div className="upload-file">
										<p>Upload Custom Base File</p>
										<span className="uploaded-file">
											<p title={fileDetail['name']}>{fileDetail['name'].slice(0, 20)}...</p>
											<img style={{ cursor: 'pointer' }} src={Crossicon} alt="crossIcon" onClick={() => handleFile()} />
										</span>
									</div>
								)}
								<div className="btn-wrapper">
									<Button handleClick={() => handleCancel()} label={'Cancel'} className={'cancelBtn'} />
									<Button handleClick={() => handleSubmit()} label={'Submit for Approval'} className={'approveBtn'} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="rejected-reason">
					<h1>Reason of Rejection</h1>
					<p>{get(selectedCampaign, 'comment', null)}</p>
				</div>
			</div>
		</>
	);
};

export default Rejectedcampaign;
