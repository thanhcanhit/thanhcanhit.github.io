import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { User } from "../interface/User";
import jwtDecode from "jwt-decode";
import { refreshToken } from "./authRequest";
import { loginSuccess } from "../redux/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

const API_URL =   "http://localhost:4000";//"https://thanhcanhit.id.vn";
const axiosIntance = axios.create({
	baseURL: API_URL,
});

const createAxiosJWT = (user: User, dispatch: Dispatch): AxiosInstance => {
	const axiosJWT = axios.create({ baseURL: API_URL });
	axiosJWT.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			const decodedToken: { exp: number } = jwtDecode(user.accessToken);

			if (decodedToken.exp < new Date().getTime() / 1000) {
				const response = await refreshToken();
				const newAccessToken = response.data.accessToken;
				const refreshUser: User = {
					...user,
					accessToken: newAccessToken,
				};

				// Update redux store & override headers
				dispatch(loginSuccess(refreshUser));
				config.headers["authorization"] = `Bearer ${newAccessToken}`;
				console.log(config.headers["authorization"])
			}
			return config;
		}
	);

	return axiosJWT;
};

export { API_URL, axiosIntance, createAxiosJWT };
