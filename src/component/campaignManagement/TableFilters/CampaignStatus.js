import React from 'react';
import SelectFilter from './SelectFilter';
import Icon from '../../../assets/images/Calendar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCampaignStatusFilters } from '../../../reducers/campaign';
import { setCampaignStatus } from '../../../reducers/communication';
import { cloneDeep } from 'lodash';
const CampaignStatus = ({ resetPagination }) => {
	const { campaignStatus } = useSelector((state) => state.communicationSlice);
	const { selectedCampaignStatusFilters } = useSelector((state) => state.campaignSlice);
	const dispatch = useDispatch();
	const data = {
		icon: Icon,
		placeHolder: 'Select Approval Status',
		width: '245px'
	};
	const isAllSelected = campaignStatus.length === selectedCampaignStatusFilters.length ? true : false;
	const isSelected = (value) => {
		return selectedCampaignStatusFilters.find((type) => type.campaignStatusId === value);
	};
	const handleChange = (value, data) => {
		let selectedTypes = cloneDeep(selectedCampaignStatusFilters);
		let types = cloneDeep(campaignStatus);
		let selectedType = campaignStatus.find((type) => type.campaignStatusId === value);
		if (value === 'all') {
			types = types.map((t) => {
				return { ...t, isActive: !data['isActive'] };
			});
			selectedTypes = types;
			if (data['isActive']) {
				selectedTypes = [];
			}
		} else {
			types.forEach((element) => {
				if (element['campaignStatusId'] === value) {
					element.isActive = !data['isActive'];
				}
			});
			if (isSelected(value)) {
				selectedTypes = selectedTypes.filter((d) => d.campaignStatusId !== value);
			} else {
				selectedTypes = [...selectedTypes, selectedType];
			}
		}
		resetPagination();
		dispatch(setCampaignStatus(types));
		dispatch(setSelectedCampaignStatusFilters(selectedTypes));
	};
	const options = campaignStatus?.map((type) => {
		return {
			label: type['description'],
			value: type['campaignStatusId'],
			isActive: isAllSelected ? isAllSelected : type['isActive'] ? true : false
		};
	});
	return (
		<div>
			<SelectFilter data={data} handleChange={handleChange} options={[...options]} isSelectedAll={isAllSelected} />
		</div>
	);
};

export default CampaignStatus;
