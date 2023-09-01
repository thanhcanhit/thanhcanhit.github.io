import axiosLib from "axios";
import { CommentInterface } from "../interface/Comments";

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
};
