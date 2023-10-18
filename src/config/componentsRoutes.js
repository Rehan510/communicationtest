import OneLoad from '../components/example';
import Tab1 from '../components/example/Tab1';
import Tab2 from '../components/example/Tab2';
import Tab3 from '../components/example/Tab3';
export const nestedRoutes = [
	{
		label: 'OneLoad',
		disabled: false,
		index: true,
		component: <OneLoad />,
		path: '/oneload',
		children: [
			{
				label: 'Tab1',
				disabled: false,
				component: <Tab1 />,
				index: false,
				path: 'tab1',
				children: []
			},
			{
				label: 'Tab2',
				disabled: false,
				component: <Tab2 />,
				index: false,
				path: 'tab2'
			},
			{
				label: 'Tab3',
				disabled: false,
				component: <Tab3 />,
				index: false,
				path: 'tab3'
			}
		]
	}
];

export const singleRoutes = [
	{
		label: 'OneLoad',
		disabled: false,
		index: true,
		component: <OneLoad />,
		path: '/oneload'
	}
];
