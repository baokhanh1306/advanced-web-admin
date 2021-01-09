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
		deleteUserSuccess: (state,action) => {
			state.users = [...action.payload];
			state.loading = false;
			state.errorMsg = null;
		},
		deleteUserFailure: (state,action) => {
			state.loading = false;
			state.errorMsg = action.payload;
		},
		unBanSuccess: (state,action) => {
			state.users = [...action.payload];
			state.loading = false;
			state.errorMsg = null;
		},
		unBanFailure: (state,action) => {
			state.loading = false;
			state.errorMsg = action.payload;
		},
	},
});

const { request, getUsersSuccess, getUsersFailure, deleteUserSuccess, deleteUserFailure, unBanSuccess, unBanFailure } = slice.actions;

export const getUsers = (filter='',query='') => async (dispatch) => {
	try {
		dispatch(request());
		const res = await api.get(`/admin/users?filter=${filter}&q=${query}`);
		const { users } = res.data;
		dispatch(getUsersSuccess(users));
	} catch (err) {
		dispatch(getUsersFailure(err.response.data.message));
	}
};

export const deleteUser = (id) => async (dispatch) => {
	try{
		dispatch(request());
		const res = await api.delete(`/admin/users/${id}`);
		const { users } = res.data;
		dispatch(deleteUserSuccess(users));
	} catch(err) {
		dispatch(deleteUserFailure(err.response.data.message));
	}
};

export const unBanUser = (id) => async (dispatch) => {
	try{
		dispatch(request());
		const res = await api.put(`/admin/users/${id}`);
		const { users } = res.data;
		dispatch(unBanSuccess(users));
	} catch(err) {
		dispatch(unBanFailure(err.response.data.message));
	}
}

export default slice.reducer;
