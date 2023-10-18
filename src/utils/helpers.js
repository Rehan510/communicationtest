import { weekDays } from '../config/data';
export const getDaysName = (selectedCampaignDays) => {
	let days = [];
	selectedCampaignDays.forEach((element) => {
		const isDay = weekDays.find((v) => v.value === element);
		if (isDay) {
			days.push(isDay);
		}
	});

	return days;
};

export const getFileName = (fileName) => {
	let name = fileName;
	if (name && name.length > 19) {
		name = fileName.slice(0, 20) + '...';
	}
	return name;
};
