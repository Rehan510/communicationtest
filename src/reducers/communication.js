import { createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
const isLoginReq = localStorage.getItem('islogin') === 'true' ? false : true;
const loginUserInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const roleToLowerCase = get(loginUserInfo, 'communicationRole', '').toLowerCase();
const isDirector = roleToLowerCase === 'director';
const isManager = roleToLowerCase === 'manager';
export const communicationSlice = createSlice({
	name: 'communication',
	initialState: {
		name: 'yess i am working fine',
		isLoginRequired: isLoginReq,
		selectedTab: 'campaign',
		campaignView: 'campaignTable',
		campaignStep: 1,
		campaignTypes: [],
		campaignStatus: [],
		isDirector: isDirector,
		loginUser: loginUserInfo,
		isManager: isManager,
		notifications: []
	},
	reducers: {
		test: (state) => {
			return { ...state, name: 'Ok' };
		},
		setIsLoginRequired: (state, action) => {
			return { ...state, isLoginRequired: action.payload };
		},
		setSelectedTab: (state, action) => {
			return { ...state, selectedTab: action.payload };
		},
		setCampaignView: (state, action) => {
			return { ...state, campaignView: action.payload };
		},
		setCampaignStep: (state, action) => {
			return { ...state, campaignStep: action.payload };
		},
		setCampaignTypes: (state, action) => {
			return { ...state, campaignTypes: action.payload };
		},
		setCampaignStatus: (state, action) => {
			return { ...state, campaignStatus: action.payload };
		},
		setLoginUser: (state, action) => {
			return { ...state, loginUser: action.payload };
		},
		setIsDirector: (state, action) => {
			return { ...state, isDirector: action.payload };
		},
		setIsManager: (state, action) => {
			return { ...state, isManager: action.payload };
		},
		setNotification: (state, action) => {
			return { ...state, notifications: action.payload };
		}
	}
});

export const {
	test,
	setIsLoginRequired,
	setSelectedTab,
	setCampaignView,
	setCampaignStep,
	setCampaignStatus,
	setCampaignTypes,
	setLoginUser,
	setIsDirector,
	setIsManager,
	setNotification
} = communicationSlice.actions;
export default communicationSlice.reducer;
