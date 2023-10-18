export const weekDays = [
	{ value: 1, label: 'Monday' },
	{ value: 2, label: 'Tuesday' },
	{ value: 3, label: 'Wednesday' },
	{ value: 4, label: 'Thursday' },
	{ value: 5, label: 'Friday' },
	{ value: 6, label: 'Saturday' },
	{ value: 7, label: 'Sunday' }
];
export const monthDays = [
	{ value: 1, label: '1st Day' },
	{ value: 2, label: '2nd Day' },
	{ value: 3, label: '3rd Day' },
	{ value: 4, label: '4th Day' },
	{ value: 5, label: '5th Day' },
	{ value: 6, label: '6th Day' },
	{ value: 7, label: '7th Day' },
	{ value: 8, label: '8th Day' },
	{ value: 9, label: '9th Day' },
	{ value: 10, label: '10th Day' },
	{ value: 11, label: '11th Day' },
	{ value: 12, label: '12th Day' },
	{ value: 13, label: '13th Day' },
	{ value: 14, label: '14th Day' },
	{ value: 15, label: '15th Day' },
	{ value: 16, label: '16th Day' },
	{ value: 17, label: '17th Day' },
	{ value: 18, label: '18th Day' },
	{ value: 19, label: '19th Day' },
	{ value: 20, label: '20th Day' },
	{ value: 21, label: '21st Day' },
	{ value: 22, label: '22nd Day' },
	{ value: 23, label: '23rd Day' },
	{ value: 24, label: '24th Day' },
	{ value: 25, label: '25th Day' },
	{ value: 26, label: '26th Day' },
	{ value: 27, label: '27th Day' },
	{ value: 28, label: '28th Day' },
	{ value: 29, label: '29th Day' },
	{ value: 30, label: '30th Day' },
	{ value: 31, label: '31st Day' }
];
export const messageTypes = [
	{ name: 'OneTime', value: 'onetime' },
	{ name: 'Recursive', value: 'recursive' }
];
export const frequencyTypes = [
	{ name: 'Everyday', value: 'everyDay' },
	{ name: 'Any week day', value: 'weekDay' }
];

export const frequencyDef = {
	everyDay: { label: 'Every', name: 'Every', placeholder: '', option: [] },
	weekDay: { label: 'Week', name: 'Week', placeholder: 'Select Day', option: weekDays }
	// monthDay: { label: 'Month', name: 'Month', placeholder: 'Select Month Day', option: monthDays }
};
export const managerTable = ['Creation Date', 'Campaign Name', 'Campaign Type', 'Decision', 'Current Status'];
export const directorTable = [
	'Submission Date',
	'Campaign Date',
	'Campaign Name',
	'Campaign Type',
	'Created By',
	'Decision',
	'Current Status'
];
export const frequencyKey = {
	everyDay: 'EVERYDAY',
	weekDay: 'WEEKDAY'
};
