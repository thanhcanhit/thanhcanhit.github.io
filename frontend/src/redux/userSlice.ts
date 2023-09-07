import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interface/User";
import { RootState } from "./store";

const initialState: {
	isFetching: boolean;
	user: User | null;
	error: string | null;
} = {
	isFetching: false,
	user: null,
	error: null,
};
const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		getUserStarted: (state) => {
			state.isFetching = true;
		},
		getUserSuccess: (state, action) => {
			state.isFetching = false;
			state.user = action.payload;
			state.error = null;
		},
		getUserFailed: (state, action) => {
			state.isFetching = false;
			state.error = action.payload;
		},
		userLogout: (state) => {
			state.error = null;
			state.user = null;
			state.isFetching = false;
		},
	},
});

const userSelector = (state: RootState) => state.user;
export { userSelector };

export const { getUserFailed, getUserStarted, getUserSuccess, userLogout } =
	userSlice.actions;

export default userSlice.reducer;
