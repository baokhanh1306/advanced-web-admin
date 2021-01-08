import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const slice = createSlice({
	name: 'users',
	initialState: {
		users: [],
		loading: false,
		errorMsg: null,
	},
	reducers: {
		request: (state, action) => {
			state.loading = true;
		},
		getUsersSuccess: (state, action) => {
			state.users = [...action.payload];
			state.loading = false;
			state.errorMsg = null;
		},
		getUsersFailure: (state, action) => {
			state.users = [];
			state.loading = false;
			state.errorMsg = action.payload;
		},
	},
});

const { request, getUsersSuccess, getUsersFailure } = slice.actions;

export const getUsers = () => async (dispatch) => {
	try {
		dispatch(request());
		const res = await api.get('/admin/users');
		const { users } = res.data;
		dispatch(getUsersSuccess(users));
	} catch (err) {
		dispatch(getUsersFailure(err.response.data.message));
	}
};

export default slice.reducer;
