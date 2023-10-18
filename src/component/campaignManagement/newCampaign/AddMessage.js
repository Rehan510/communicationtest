import React, { useCallback, useMemo } from 'react';
import { Select, Space, Form, Input, Upload } from 'antd';
import Uploadicon from '../../../assets/images/Upload.svg';
import { get } from 'lodash';
import { setCampaignStep, setCampaignView } from '../../../reducers/communication';
import Crossicon from '../../../assets/images/Cross.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCustomeBase, setFileDetail, setMessage } from '../../../reducers/campaign';
import Button from './Button';
import { createCampaign, updateCampaign } from './actionCampaign';
import config from '../../../config/config';
import { toast } from 'react-toastify';
import { ADD_DETAIL, CONFIRMATION } from '../../../config/campaginStagesCodes';
import { DRAFT } from '../../../config/campaignStatusCodes';
import { FLASH_POP_UP, SUCCESSFUL_COMPLETION, NEWS_UPDATES } from '../../../config/campaignTypesCodes';
import { ALL_CONSUMER_BASE, CUSTOM_BASE } from '../../../config/campaignUserTypesCodes';
import { getFileName } from '../../../utils/helpers';

const Addmessage = () => {
	const { userTypesBase, selectedCustomeBase, fileDetail, message, selectedCampaign, selectedCampaignType } =
		useSelector((state) => state.campaignSlice);
	const dispatch = useDispatch();
	const { Option } = Select;
	const { TextArea } = Input;
	const isDisable = useMemo(() => {
		let status = true;
		if (selectedCustomeBase && message) {
			status = false;
			if (get(selectedCustomeBase, 'userTypeId', null) === 9 && !fileDetail) {
				status = true;
			}
		}
		return status;
	}, [selectedCustomeBase, message, fileDetail]);

	const buttons = [
		{
			label: 'Back',
			className: 'cancel-btn',
			key: 'back',
			disable: false
		},
		{
			label: 'cancel',
			className: 'cancel-btn',
			key: 'cancel',
			disable: false
		},
		{
			label: 'Save as draft',
			className: 'save-btn',
			key: 'draft',
			disable: false
		},
		{
			label: 'Continue',
			className: isDisable ? 'continue-btn' : 'save-btn',
			key: 'continue',
			disable: isDisable
		}
	];

	const handleChange = (value, base) => {
		dispatch(setFileDetail(null));
		dispatch(setSelectedCustomeBase(base['data']));
	};
	const beforeUpload = (file) => {
		toast.dismiss();
		const isJpgOrPng =
			file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
			file.type === 'text/csv' ||
			file.type === 'application/vnd.ms-excel';
		if (!isJpgOrPng) {
			toast.error('You can only upload .xlsx/csv file!');
		}
		const isLt5M = file.size / 1024 / 1024 < 5;
		if (!isLt5M) {
			toast.error('file must smaller than 5MB!');
		}
		return isJpgOrPng && isLt5M;
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

	const handleClick = (btn) => {
		if (btn['key'] === 'continue') {
			dispatch(setCampaignStep(CONFIRMATION));
		}
		if (btn['key'] === 'cancel') {
			dispatch(setCampaignView('campaignTable'));
		}
		if (btn['key'] === 'back') {
			dispatch(setCampaignStep(ADD_DETAIL));
		}
		if (btn['key'] === 'draft') {
			if (get(selectedCampaign, 'campaignId', false)) {
				dispatch(updateCampaign(DRAFT, 'Your draft campaign is updated', setCampaignView('campaignTable')));
			} else {
				dispatch(createCampaign(DRAFT, false, 'Your campaign saved as draft', setCampaignView('campaignTable')));
			}
		}
	};
	const handleFile = () => {
		dispatch(setFileDetail(null));
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
		<div className="register add-message-form">
			<strong>Add Message</strong>
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
							{getUserBase().map((data, index) => {
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
								defaultValue={message}
								value={message}
								className="textArea"
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
								<p title={fileDetail['name']}>{getFileName(fileDetail['name'])}</p>
								<img style={{ cursor: 'pointer' }} src={Crossicon} alt="crossIcon" onClick={() => handleFile()} />
							</span>
						</div>
					)}
					<div className="btn-wrapper">
						{buttons.map((btn) => {
							return (
								<Button
									key={btn.key}
									label={btn.label}
									className={btn.className}
									data={btn}
									handleClick={() => handleClick(btn)}
									disabled={btn.disable}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Addmessage;
