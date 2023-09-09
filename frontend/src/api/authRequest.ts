import { Dispatch } from "@reduxjs/toolkit";
import { axiosIntance as axios } from "./apiConstants";
import {
	loginStarted,
	loginSuccess,
	loginFailed,
	logout as logoutAction,
	registerStarted,
	registerSuccess,
	registerFailed,
} from "../redux/authSlice";

async function login(
	data: { username: string; password: string },
	dispatch: Dispatch
) {
	try {
		dispatch(loginStarted());
		const res = await axios.post(
			`/auth/login`,
			{ ...data },
			{
				withCredentials: true,
			}
		);
		dispatch(loginSuccess(res.data.data));
		return true;
	} catch (err) {
		dispatch(loginFailed("Can't login"));
		return false;
	}
}

async function register(
	data: {
		username: string;
		password: string;
		name: string;
	},
	dispatch: Dispatch
) {
	try {
		dispatch(registerStarted);
		const res = await axios.post(`/auth/register`, { ...data });
		const isSuccess = Boolean(!res.data.error);
		if (isSuccess) dispatch(registerSuccess());
		return isSuccess;
	} catch (err) {
		dispatch(registerFailed(err));
		return false;
	}
}

async function refreshToken() {
	try {
		const res = await axios.get(`/auth/refresh`, {
			withCredentials: true,
		});

		return res.data;
	} catch (err) {
		console.log("error", err);
		return false;
	}
}

async function logout(dispatch: Dispatch) {
	try {
		dispatch(logoutAction());
		await axios.post(`/auth/logout`);
		return true;
	} catch (err) {
		return false;
	}
}

export { login, logout, refreshToken, register };
