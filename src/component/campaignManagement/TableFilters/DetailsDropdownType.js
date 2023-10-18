import React from 'react';
import SelectFilter from './SelectFilter';
import Message from '../../../assets/images/message.svg';
const DetailsDropdownType = () => {
	const data = {
		icon: Message,
		placeHolder: 'Select Type',
		width: '580px'
	};
	const handleChange = (value) => {};
	const options = [
		{ label: 'Promotional SMS', value: 'all', isCheck: false },
		{ label: 'News & Updates', value: 'approve', isCheck: true }
	];
	return (
		<div>
			<SelectFilter data={data} handleFilter={handleChange} options={options} />
		</div>
	);
};

export default DetailsDropdownType;
