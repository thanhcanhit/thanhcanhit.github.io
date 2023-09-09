import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interface/User";
import { RootState } from "./store";

const initialState: {
	login: {
		isFetching: boolean;
		user: User | null;
		error: string | null;
	};
	register: { isFetching: boolean; isCompleted: boolean; error: string | null };
} = {
	login: {
		isFetching: false,
		user: null,
		error: null,
	},
	register: {
		isFetching: false,
		isCompleted: false,
		error: null,
	},
};

const userSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		loginStarted: (state) => {
			state.login.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.login.isFetching = false;
			state.login.user = action.payload;
			state.login.error = null;
		},
		loginFailed: (state, action) => {
			state.login.isFetching = false;
			state.login.error = action.payload;
		},
		registerStarted: (state) => {
			state.register.isFetching = true;
		},
		registerSuccess: (state) => {
			state.register.isFetching = false;
			state.register.isCompleted = true;
			state.register.error = null;
		},
		registerFailed: (state, action) => {
			state.register.isFetching = false;
			state.register.error = action.payload;
		},
		logout: (state) => {
			state.login.error = null;
			state.login.user = null;
			state.login.isFetching = false;
		},
	},
});

// Selectors
const loginSelector = (state: RootState) => state.auth.login;
const userSelector = (state: RootState) => state.auth.login.user;
const registerSelector = (state: RootState) => state.auth.register;
export { loginSelector, userSelector, registerSelector };

export const {
	loginStarted,
	loginSuccess,
	loginFailed,
	registerStarted,
	registerSuccess,
	registerFailed,
	logout,
} = userSlice.actions;

export default userSlice.reducer;
