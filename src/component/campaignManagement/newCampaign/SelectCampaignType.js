import React from 'react';
import { Select, Space, Form } from 'antd';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
const { Option } = Select;
const Selectcampaigntype = ({ handleChange }) => {
	const { campaignTypes } = useSelector((state) => state.communicationSlice);
	const { selectedCampaignType } = useSelector((state) => state.campaignSlice);
	return (
		<div>
			<Form.Item
				name="Campaign Type"
				label="Campaign Type"
				rules={[
					{
						required: true
					}
				]}
			>
				<Select
					size="large"
					defaultValue={get(selectedCampaignType, 'campaignTypeId', null)}
					value={get(selectedCampaignType, 'campaignTypeId', null)}
					placeholder="Enter campaign type"
					className="detailsInput"
					popupClassName="select-compaign"
					onChange={handleChange}
				>
					{campaignTypes.map((data, index) => {
						return (
							<Option key={`type${index}`} value={data['campaignTypeId']} label={data['description']} data={data}>
								<Space>{data['description']}</Space>
							</Option>
						);
					})}
				</Select>
			</Form.Item>
		</div>
	);
};

export default Selectcampaigntype;
