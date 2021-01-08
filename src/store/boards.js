import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const slice = createSlice({
	name: 'boards',
	initialState: {
		boards: [],
		loading: false,
		errorMsg: null,
	},
	reducers: {
		request: (state, action) => {
			state.loading = true;
		},
		getBoardsSuccess: (state, action) => {
			state.boards = [...action.payload];
			state.loading = false;
			state.errorMsg = null;
		},
		getBoardsFailure: (state, action) => {
			state.loading = false;
			state.errorMsg = action.payload;
		},
	},
});

const { request, getBoardsFailure, getBoardsSuccess } = slice.actions;

export const getBoards = () => async (dispatch) => {
	try {
		dispatch(request());
		const res = await api.get('/admin/boards');
		const { boards } = res.data;
		dispatch(getBoardsSuccess(boards));
	} catch (err) {
		dispatch(getBoardsFailure(err.response.data.message));
	}
};

export default slice.reducer;
