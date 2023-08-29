import axiosLib from "axios";

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
}

export { getPosts, getPostsWithQuery, getTotalItems };
