import React from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import Calender from '../../../assets/images/Calendar.svg';
import { setFiltersDates } from '../../../reducers/campaign';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import Moment from 'moment';

const App = ({ resetPagination }) => {
	const dispatch = useDispatch();
	const { filterDates } = useSelector((state) => state.campaignSlice);
	const dateFormat = 'YYYY-MM-DD';
	const disabledDate = (current) => {
		let data = false;
		if (current && current >= Moment().add(6, 'months')) {
			data = true;
		}
		return data;
	};
	const handleDate = (date) => {
		if (date) {
			resetPagination();
			const range = { startDate: dayjs(date[0]).format(dateFormat), endDate: dayjs(date[1]).format(dateFormat) };
			dispatch(setFiltersDates(range));
		}
		if (!date) {
			dispatch(setFiltersDates(null));
		}
	};

	return (
		<div className="date">
			<div className="calender-image">
				<img src={Calender} />
			</div>

			<RangePicker
				disabledDate={disabledDate}
				format={dateFormat}
				suffixIcon={null}
				onChange={(a) => {
					handleDate(a);
				}}
				placement="bottomRight"
				size="large"
				className="filter-item"
				value={filterDates ? [dayjs(filterDates.startDate, dateFormat), dayjs(filterDates.endDate, dateFormat)] : null}
			/>
		</div>
	);
};
export default App;
