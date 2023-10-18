import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
const dateFormat = 'YYYY-MM-DD';
let campaignState = {
	selectedCampaignType: null,
	campaignName: null,
	messageType: 'onetime',
	startDate: null,
	endDate: null,
	time: null,
	selectedFrequency: 'everyDay',
	selectedCustomeBase: null,
	message: null,
	fileDetail: null,
	selectedCampaign: null,
	selectedCampaignDays: [],
	isPagination: true
};
export const campaignSlice = createSlice({
	name: 'campaign',
	initialState: {
		...campaignState,
		userTypesBase: [],
		selectedCampaignTypeFilters: [],
		selectedCampaignStatusFilters: [],
		filterDates: {
			startDate: dayjs(Date.now()).subtract(6, 'day').format(dateFormat),
			endDate: dayjs(Date.now()).format(dateFormat)
		},
		searchedCampaign: null
	},
	reducers: {
		setSelectedCampaignTypeFilters: (state, action) => {
			return { ...state, selectedCampaignTypeFilters: action.payload };
		},
		setSelectedUserBase: (state, action) => {
			return { ...state, userTypesBase: action.payload };
		},
		setSelectedCampaignStatusFilters: (state, action) => {
			return { ...state, selectedCampaignStatusFilters: action.payload };
		},
		setSelectedCampaignType: (state, action) => {
			return { ...state, selectedCampaignType: action.payload };
		},
		setCampaignName: (state, action) => {
			return { ...state, campaignName: action.payload };
		},
		setMessageType: (state, action) => {
			return { ...state, messageType: action.payload };
		},
		setStartDate: (state, action) => {
			return { ...state, startDate: action.payload };
		},
		setEndDate: (state, action) => {
			return { ...state, endDate: action.payload };
		},
		setTime: (state, action) => {
			return { ...state, time: action.payload };
		},
		setFrequecny: (state, action) => {
			return { ...state, selectedFrequency: action.payload };
		},
		setSelectedCustomeBase: (state, action) => {
			return { ...state, selectedCustomeBase: action.payload };
		},
		setMessage: (state, action) => {
			return { ...state, message: action.payload };
		},
		setFileDetail: (state, action) => {
			return { ...state, fileDetail: action.payload };
		},
		setCampaignDays: (state, action) => {
			return { ...state, selectedCampaignDays: action.payload };
		},
		setFiltersDates: (state, action) => {
			return { ...state, filterDates: action.payload };
		},
		setSearchedCampaign: (state, action) => {
			return { ...state, searchedCampaign: action.payload };
		},
		setSelectedCampaign: (state, action) => {
			return { ...state, selectedCampaign: action.payload };
		},
		setCampaignData: (state, action) => {
			const {
				// campaignId,
				campaignName,
				campaignTypeId,
				campaignType,
				userTypeId,
				userType,
				// campaignStatusId,
				// campaignStatus,
				// createdBy,
				// approvedBy,
				// campaignDescription,
				message,
				startDate,
				endDate,
				executionTime,
				frequency,
				// comment,
				file,
				// savedStep,
				campaignDays
			} = action.payload;

			return {
				...state,
				selectedCampaignType: {
					campaignTypeId: campaignTypeId,
					description: campaignType
				},
				campaignName: campaignName,
				messageType: frequency === 'ONETIME' ? 'onetime' : 'recursive',
				startDate: startDate,
				endDate: endDate,
				time: executionTime,
				selectedFrequency: frequency === 'EVERYDAY' ? 'everyDay' : 'weekDay',
				selectedCustomeBase: { userTypeId: userTypeId, description: userType },
				message: message,
				fileDetail: file ? { name: file } : null,
				selectedCampaignDays: campaignDays
			};
		},
		resetCampaign: (state) => {
			return { ...state, ...campaignState };
		},
		setIsPagination: (state, action) => {
			return { ...state, isPagination: action.payload };
		}
	}
});

export const {
	setMessageType,
	setCampaignName,
	setSelectedCampaignTypeFilters,
	setSelectedCampaignStatusFilters,
	setSelectedCampaignType,
	setSelectedUserBase,
	setStartDate,
	setEndDate,
	setTime,
	setFrequecny,
	setDays,
	setSelectedCustomeBase,
	setMessage,
	setFileDetail,
	setCampaignDays,
	resetCampaign,
	setFiltersDates,
	setSearchedCampaign,
	setSelectedCampaign,
	setCampaignData,
	setIsPagination
} = campaignSlice.actions;
export default campaignSlice.reducer;
