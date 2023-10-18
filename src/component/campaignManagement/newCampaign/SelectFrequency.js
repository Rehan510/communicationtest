import React from 'react';
import { Space, Select } from 'antd';
const { Option } = Select;
import tagcross from '../../../assets/images/tagcross.svg';
import CircleCheck from '../../../assets/images/Circle_Check.png';
import UnCircleCheck from '../../../assets/images/Circle.png';
const FormDaySelected = ({ frequencyData, handleCampaignDays, selectedCampaignDays }) => {
	const [open, setOpen] = React.useState(false);
	return (
		<div className="day-selected">
			<label>{frequencyData['label']}</label>
			<Select
				size="large"
				placeholder={frequencyData['placeholder']}
				popupClassName="select-day"
				value={frequencyData['placeholder']}
				onChange={handleCampaignDays}
				open={open}
				onMouseLeave={() => setOpen(false)}
				onClick={() => setOpen(true)}
			>
				{frequencyData['option'].map((data) => {
					return (
						<Option key={data['label']} value={data['value']} label={data['label']}>
							<Space>
								<span role="img" aria-label="China">
									<img
										src={selectedCampaignDays.includes(data['value']) ? CircleCheck : UnCircleCheck}
										alt="BigCo Inc. logo"
									/>
								</span>
								{data['label']}
							</Space>
						</Option>
					);
				})}
			</Select>
			<div className="selected-tags">
				{frequencyData['option'].map(
					(d, index) =>
						selectedCampaignDays.includes(d['value']) && (
							<div key={`selected${index}`} className="selected-item">
								<p>{d.label}</p>
								<img
									src={tagcross}
									onClick={() => {
										handleCampaignDays(d['value']);
									}}
								/>
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default FormDaySelected;
