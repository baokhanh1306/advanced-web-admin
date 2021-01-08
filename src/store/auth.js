import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import history from '../utils/history';

const initUser = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

const slice = createSlice({
	name: 'auth',
	initialState: {
		user: initUser,
		loading: false,
		errorMsg: null,
	},
	reducers: {
		request: (state, action) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.errorMsg = null;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		loginFailure: (state, action) => {
			state.errorMsg = action.payload;
			state.loading = false;
		},
		logoutSuccess: (state, action) => {
			state.user = null;
			state.loading = false;
			state.errorMsg = null;
		},
	},
});

const { request, loginSuccess, loginFailure, logoutSuccess } = slice.actions;

export const login = (credentials) => async (dispatch) => {
	try {
		dispatch(request());
		const res = await api.post('/users/login', credentials);
		const { email, token, isAdmin } = res.data;
		if (!isAdmin) dispatch(loginFailure('You must be admin'));
		else {
			localStorage.setItem('token', token);
			dispatch(loginSuccess(email));
			history.push('/dashboard');
		}
	} catch (err) {
		dispatch(loginFailure(err.response.data.message));
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	dispatch(logoutSuccess());
};

export default slice.reducer;
