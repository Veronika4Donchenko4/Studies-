import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const { data } = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);
	return data;
});

const initialState = {
	start: 0,
	end: 3,
	users: [],
	showUsers: [],
	deletedUsers: [],
	currentUser: {},
	EditedUser: {},
	status: 'loading',
	isSmallUsers: true,
	isShowInfoPopup: false,
	isShowAddPopup: false,
	isShowEditPopup: false,
	isShowRemovePopup: false
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,

	reducers: {
		chancheSizeUsers: state => {
			state.isSmallUsers = !state.isSmallUsers;
			state.isShowAddPopup = false;
			state.isShowEditPopup = false;
			state.isShowInfoPopup = false;
			state.isShowRemovePopup = false;
		},
		openInfoPopup: (state, action) => {
			state.isShowInfoPopup = true;
			state.currentUser = state.showUsers.find(
				item => item.id === action.payload
			);
			state.isShowAddPopup = false;
			state.isShowEditPopup = false;
			state.isShowRemovePopup = false;
		},
		closeInfoPopup: state => {
			state.isShowInfoPopup = false;
		},
		openEditPopup: (state, action) => {
			state.isShowEditPopup = true;
			state.currentUser = state.showUsers.find(
				item => item.id === action.payload
			);
			state.isShowAddPopup = false;
			state.isShowInfoPopup = false;
			state.isShowRemovePopup = false;
		},
		closeEditPopup: state => {
			state.isShowEditPopup = false;
		},
		openRemovePopup: (state, action) => {
			state.isShowRemovePopup = true;
			state.currentUser = state.showUsers.find(
				item => item.id === action.payload
			);
			state.isShowAddPopup = false;
			state.isShowAddPopup = false;
			state.isShowInfoPopup = false;
		},
		closeRemovePopup: state => {
			state.isShowRemovePopup = false;
		},
		openAddPopup: state => {
			state.isShowAddPopup = true;
			state.isShowEditPopup = false;
			state.isShowInfoPopup = false;
			state.isShowRemovePopup = false;
		},
		closeAddPopup: state => {
			state.isShowAddPopup = false;
		},
		addItem: (state, action) => {
			if (
				action.payload.name === '' ||
				action.payload.username === '' ||
				action.payload.email === '' ||
				action.payload.phone === ''
			) {
				alert('Please fill in the filds');
			} else {
				state.showUsers.push(action.payload);
				state.users.push(action.payload);
				state.isShowAddPopup = false;
			}
		},
		updateItem: (state, action) => {
			state.currentUser = state.showUsers.find(
				item => item.id === action.payload.id
			);
			state.currentUser.name = action.payload.name;
			state.currentUser.username = action.payload.username;
			state.currentUser.email = action.payload.email;
			state.currentUser.phone = action.payload.phone;
			state.currentUser.website = action.payload.website;
			state.EditedUser = state.users.find(
				item => item.id === action.payload.id
			);
			state.EditedUser.name = action.payload.name;
			state.EditedUser.username = action.payload.username;
			state.EditedUser.email = action.payload.email;
			state.EditedUser.phone = action.payload.phone;
			state.EditedUser.website = action.payload.website;
		},
		removeUser: (state, action) => {
			state.showUsers = state.showUsers.filter(
				item => item.id !== state.currentUser.id
			);
			state.isShowRemovePopup = false;
			state.deletedUsers = state.users.filter(
				item => item.id !== state.currentUser.id
			);
		},
		addThreeshowUsers: state => {
			if (state.end <= 100) {
				state.start += 3;
				state.end += 3;
				const nextThreeusers = state.users.slice(state.start, state.end);
				state.showUsers = state.showUsers.concat(nextThreeusers);
			}
		},
		showFirstUser: state => {
			state.showUsers = state.users.slice(state.start, state.end);
		}
	},
	extraReducers: {
		[fetchUsers.pending]: state => {
			state.status = 'loading';
			state.users = [];
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.status = 'success';
		},
		[fetchUsers.rejected]: state => {
			state.status = 'error';
			state.users = [];
		}
	}
});

export const {
	chancheSizeUsers,
	showFirstUser,
	addThreeshowUsers,
	addItem,
	updateItem,
	removeUser,
	openAddPopup,
	openInfoPopup,
	openEditPopup,
	openRemovePopup,
	closeAddPopup,
	closeInfoPopup,
	closeEditPopup,
	closeRemovePopup
} = usersSlice.actions;

export default usersSlice.reducer;
