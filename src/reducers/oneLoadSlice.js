import { createSlice } from '@reduxjs/toolkit';
const state = {};

export const oneLoad = createSlice({
	name: 'oneLoad',
	initialState: state,
	reducers: {
		increment: (state, action) => {
			return { ...state, value: action.payload };
		},

		setNewAppName: (state) => {
			return { ...state, appName: 'oneLoad' };
		}
	}
});

export const { increment, setNewAppName } = oneLoad.actions;
export default oneLoad.reducer;
