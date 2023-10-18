import React from 'react';
import { Select, Space } from 'antd';
import CircleCheck from '../../../assets/images/Circle_Check.png';
import UnCircleCheck from '../../../assets/images/Circle.png';
const { Option } = Select;

const SelectFilter = ({ data, handleChange, options, isSelectedAll }) => {
	return (
		<div className="filter-item">
			<div className="calender-image">
				<img src={data['icon']} />
			</div>
			<div className="select-status">
				<Select
					style={{ width: data['width'] }}
					placeholder={data['placeHolder']}
					value={data['placeHolder']}
					onChange={handleChange}
					optionLabelProp="label"
					size="large"
					popupClassName="type-name"
				>
					<Option value={'all'} label={'All'} isActive={isSelectedAll}>
						<Space>
							<span role="img" aria-label="China">
								<img src={isSelectedAll ? CircleCheck : UnCircleCheck} alt="BigCo Inc. logo" />
							</span>
							All
						</Space>
					</Option>
					{options.map((data, index) => {
						return (
							<Option
								key={`${data['label']}${index}`}
								value={data['value']}
								label={data['label']}
								isActive={data['isActive']}
							>
								<Space>
									<span role="img" aria-label="China">
										<img src={data['isActive'] ? CircleCheck : UnCircleCheck} alt="BigCo Inc. logo" />
									</span>
									{data['label']}
								</Space>
							</Option>
						);
					})}
				</Select>
			</div>
		</div>
	);
};
export default SelectFilter;
