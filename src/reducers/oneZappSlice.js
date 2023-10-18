import { createSlice } from '@reduxjs/toolkit';

export const oneZappSlice = createSlice({
	name: 'example',
	initialState: {
		name: 'yess i am working fine'
	},
	reducers: {
		test: (state) => {
			return { ...state, name: 'Ok' };
		}
	}
});

export const { test } = oneZappSlice.actions;
export default oneZappSlice.reducer;
