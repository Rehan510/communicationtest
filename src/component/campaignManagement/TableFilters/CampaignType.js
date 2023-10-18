import React from 'react';
import SelectFilter from './SelectFilter';
import Message from '../../../assets/images/message.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCampaignTypeFilters } from '../../../reducers/campaign';
import { setCampaignTypes } from '../../../reducers/communication';
import { cloneDeep } from 'lodash';

const Campaigntype = ({ resetPagination }) => {
	const { campaignTypes } = useSelector((state) => state.communicationSlice);
	const { selectedCampaignTypeFilters } = useSelector((state) => state.campaignSlice);
	const dispatch = useDispatch();
	const data = {
		icon: Message,
		placeHolder: 'Select Type',
		width: '208px'
	};
	const isAllSelected = campaignTypes.length === selectedCampaignTypeFilters.length ? true : false;
	const isSelected = (value) => {
		return selectedCampaignTypeFilters.find((type) => type.campaignTypeId === value);
	};
	const handleChange = (value, data) => {
		let selectedTypes = cloneDeep(selectedCampaignTypeFilters);
		let types = cloneDeep(campaignTypes);
		let selectedType = campaignTypes.find((type) => type.campaignTypeId === value);
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
				if (element['campaignTypeId'] === value) {
					element.isActive = !data['isActive'];
				}
			});
			if (isSelected(value)) {
				selectedTypes = selectedTypes.filter((d) => d.campaignTypeId !== value);
			} else {
				selectedTypes = [...selectedTypes, selectedType];
			}
		}
		resetPagination();
		dispatch(setCampaignTypes(types));
		dispatch(setSelectedCampaignTypeFilters(selectedTypes));
	};
	const options = campaignTypes.map((type) => {
		return {
			label: type['description'],
			value: type['campaignTypeId'],
			isActive: isAllSelected ? isAllSelected : type['isActive'] ? true : false
		};
	});
	return (
		<div>
			<SelectFilter data={data} handleChange={handleChange} options={[...options]} isSelectedAll={isAllSelected} />
		</div>
	);
};

export default Campaigntype;
