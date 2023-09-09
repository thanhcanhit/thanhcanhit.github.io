import { CommentInterface } from "../interface/Comments";
import { axiosIntance as axios } from "./apiConstants";

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

async function createComment(comment: Partial<CommentInterface>) {
	try {
		await axios.post(`/comment`, { ...comment });
		return true;
	} catch (err) {
		return false;
	}
}

export { getComments, getCommentsQuantity, createComment };
