import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'config',
	initialState: {
		selectedMenu: null,
		categories: ['Users', 'Boards'],
	},
	reducers: {
		selectedMenu: (state, action) => {
			state.selectedMenu = action.payload;
		},
		unselectMenu: (state, action) => {
			state.selectedMenu = null;
		},
	},
});

const { selectedMenu, unselectMenu } = slice.actions;

export const setSelectedMenu = (name) => (dispatch, getState) => {
	const { categories } = getState().config;
	if (!name) {
		dispatch(unselectMenu());
	} else if (
		categories.find((category) => category.toLowerCase() === name.toLowerCase())
	) {
		dispatch(selectedMenu(name));
	}
};

export const removeMenu = () => (dispatch) => {
	dispatch(unselectMenu());
};

export default slice.reducer;
