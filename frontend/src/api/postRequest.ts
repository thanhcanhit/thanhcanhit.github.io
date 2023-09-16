import { Post } from "../interface/Post";
import { axiosIntance as axios } from ".";
import { AxiosInstance } from "axios";

const getPosts = async () => {
	try {
		const res = await axios.get("/post");
		return res.data;
	} catch (err) {
		return null;
	}
};

const getPostsOfUser = async (
	userId: string,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.get(`me/posts?user_id=${userId}`, {
			headers: { authorization: `Beaer ${token}` },
		});
		return res.data;
	} catch (err) {
		return null;
	}
};

const getQuantityPostsOfUser = async (userId: string) => {
	try {
		const res = await axios.get(`me/posts/size?user_id=${userId}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const getDeletedPostsOfUser = async (
	userId: string,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.get(`me/posts/deleted?user_id=${userId}`, {
			headers: { authorization: `Beaer ${token}` },
		});
		return res.data;
	} catch (err) {
		return null;
	}
};

const getQuantityDeletedPostsOfUser = async (userId: string) => {
	try {
		const res = await axios.get(`me/posts/deleted/size?user_id=${userId}`);
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

const getPostsWithQuery = async (limit: number, offset: number) => {
	try {
		const res = await axios.get(`/post?limit=${limit}&offset=${offset}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const createPost = async (
	data: Partial<Post>,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.post(
			`/post`,
			{
				...data,
			},
			{ headers: { authorization: `Beaer ${token}` } }
		);

		return Boolean(!res.data.err);
	} catch (err) {
		return false;
	}
};

const updatePost = async (
	data: Partial<Post>,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.put(
			`/post/${data._id}`,
			{
				...data,
			},
			{ headers: { authorization: `Beaer ${token}` } }
		);

		return Boolean(!res.data.err);
	} catch (err) {
		return false;
	}
};

const deletePost = async (
	post_id: string,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.patch(
			`/post/${post_id}`,
			{},
			{
				headers: { authorization: `Beaer ${token}` },
			}
		);

		return Boolean(!res.data.err);
	} catch (err) {
		return false;
	}
};

const forceDeletePost = async (
	post_id: string,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.delete(`/post/${post_id}`, {
			headers: { authorization: `Beaer ${token}` },
		});

		return Boolean(!res.data.err);
	} catch (err) {
		return false;
	}
};

const restorePost = async (
	post_id: string,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.patch(
			`/post/${post_id}/restore`,
			{},
			{
				headers: { authorization: `Beaer ${token}` },
			}
		);

		return Boolean(!res.data.err);
	} catch (err) {
		return false;
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

const searchPost = async (title: string, tags: string[]) => {
	try {
		const temp = [["title", title]];
		if (tags.length > 0) temp.push(["tags", tags.toString()]);
		const queryString = new URLSearchParams(temp).toString();
		const res = await axios.get(`/post/search?${queryString}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

export {
	createPost,
	getPost,
	getPosts,
	getPostsWithQuery,
	getTotalItems,
	searchPost,
	getPostsOfUser,
	deletePost,
	updatePost,
	forceDeletePost,
	getDeletedPostsOfUser,
	getQuantityPostsOfUser,
	restorePost,
	getQuantityDeletedPostsOfUser,
};
