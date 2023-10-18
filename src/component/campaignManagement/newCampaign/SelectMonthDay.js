import React from 'react';
import SelectFilter from '../TableFilters/SelectFilter';
const SelectMonthDay = () => {
	const data = {
		placeHolder: 'Select Day',
		width: '532px'
	};
	const handleChange = (value) => {};
	const options = [
		{ label: '1st Day', value: 'monday', isCheck: true },
		{ label: '2nd Day', value: 'tuesday', isCheck: false },
		{ label: '3rd Day', value: 'wednesday', isCheck: false },
		{ label: '4th Day', value: 'thursday', isCheck: false },
		{ label: '5th Day', value: 'friday', isCheck: false },
		{ label: '6th Day', value: 'saturday', isCheck: false },
		{ label: '7th Day', value: 'sunday', isCheck: false }
	];
	return (
		<div className="day-selected">
			<label>Month</label>
			<SelectFilter data={data} handleFilter={handleChange} options={options} />
		</div>
	);
};

export default SelectMonthDay;
