import axiosLib from "axios";
import { CommentInterface } from "../interface/Comments";
import { Post } from "../interface/Post";
import { Dispatch } from "@reduxjs/toolkit";
import {
	getUserFailed,
	getUserStarted,
	getUserSuccess,
	userLogout,
} from "../redux/userSlice";

const API_URL = "http://localhost:4000";
const axios = axiosLib.create({ baseURL: API_URL });

const getPosts = async () => {
	try {
		const res = await axios.get("/post");
		return res.data;
	} catch (err) {
		return null;
	}
};

const getPost = async (id: string) => {
	try {
		const res = await axios.get(`/post/${id}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const createPost = async (data: Partial<Post>) => {
	try {
		await axios.post(`/post`, { ...data });
		return true;
	} catch (err) {
		return false;
	}
};

const getComments = async (postId: string) => {
	try {
		const res = await axios.get(`comment/post/${postId}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const getCommentsQuantity = async (postId: string) => {
	try {
		const res = await axios.get(`comment/post/${postId}/quantity`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const getPostsWithQuery = async (limit: number, offset: number) => {
	try {
		const res = await axios.get(`/post?limit=${limit}&offset=${offset}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const getTotalItems = async () => {
	try {
		const res = await axios.get(`/post/size`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const getAllTags = async () => {
	try {
		const res = await axios.get(`/tag`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const createTag = async (name: string) => {
	try {
		await axios.post(`/tag`, { name: name });
		return true;
	} catch (err) {
		return false;
	}
};

const getUser = async (userId: string) => {
	try {
		const res = await axios.get(`/user/${userId}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

async function createComment(comment: Partial<CommentInterface>) {
	try {
		await axios.post(`/comment`, { ...comment });
		return true;
	} catch (err) {
		return false;
	}
}

async function login(
	dispatch: Dispatch,
	data: { username: string; password: string }
) {
	try {
		dispatch(getUserStarted());
		const res = await axios.post(`/auth/login`, { ...data });
		dispatch(getUserSuccess(res.data.data));
		return true;
	} catch (err) {
		dispatch(getUserFailed("Can't login"));
		return false;
	}
}

async function register(data: {
	username: string;
	password: string;
	name: string;
}) {
	try {
		const res = await axios.post(`/auth/register`, { ...data });
		return Boolean(!res.data.error);
	} catch (err) {
		return false;
	}
}

async function logout(dispatch: Dispatch) {
	try {
		dispatch(userLogout());
		await axios.post(`/auth/logout`);
		return true;
	} catch (err) {
		return false;
	}
}

export {
	getPosts,
	getPostsWithQuery,
	getTotalItems,
	getAllTags,
	getPost,
	getComments,
	getUser,
	getCommentsQuantity,
	createComment,
	createTag,
	createPost,
	login,
	logout,
	register,
};
