import axiosLib from "axios";
import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { CommentInterface } from "../interface/Comments";
import { Post } from "../interface/Post";
import { Dispatch } from "@reduxjs/toolkit";
import {
	getUserFailed,
	getUserStarted,
	getUserSuccess,
	userLogout,
} from "../redux/authSlice";
import store from "../redux/store";
import jwtDecode from "jwt-decode";
import { refreshToken } from "./authRequest";



// // Axios interceptor
// const onRequest = async (
// 	config: InternalAxiosRequestConfig
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// ): Promise<InternalAxiosRequestConfig<any>> => {
// 	const { method, url } = config;
// 	console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
// 	const accessToken = store.getState().user.user?.accessToken;

// 	if (!accessToken) return config;
// 	const decodeToken: { exp: number } = jwtDecode(accessToken);

// 	if (decodeToken?.exp < new Date().getTime() / 1000) {
// 		console.log("expired token");
// 		const data = await refreshToken();
// 		if (!data) return config;
// 		const refreshUser = {
// 			...store.getState().user.user,
// 			accessToken: data.data.accessToken,
// 		};
// 		store.dispatch(getUserSuccess(refreshUser));
// 		console.log("refresh user", refreshUser);
// 		config.headers["authorization"] = `Bearer ${data.accessToken}`;
// 		console.log("refresh completed");
// 	}

// 	return config;
// };

// const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
// 	instance.interceptors.request.use(onRequest);
// 	return instance;
// };

// const axiosJWT = setupInterceptors(axiosLib.create({ baseURL: API_URL }));






