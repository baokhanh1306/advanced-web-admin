import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const slice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		loading: false,
		errorMsg: null,
	},
	reducers: {
		request: (state, action) => {
			state.loading = true;
		},
		getUserSuccess: (state, action) => {
			state.user = { ...action.payload };
			state.loading = false;
			state.errorMsg = null;
		},
		getUserFailure: (state, action) => {
			state.user = null;
			state.loading = false;
			state.errorMsg = action.payload;
		},
	},
});

const { request, getUserSuccess, getUserFailure } = slice.actions;

export const getUser = (id) => async (dispatch) => {
	try {
		dispatch(request());
		const res = await api.get(`/admin/users/${id}`);
		const { user, history } = res.data;
		dispatch(getUserSuccess({ ...user, history }));
	} catch (err) {
		dispatch(getUserFailure(err.response.data.message));
	}
};

export default slice.reducer;
