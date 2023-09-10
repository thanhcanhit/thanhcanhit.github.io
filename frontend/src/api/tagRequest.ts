import { axiosIntance as axios } from ".";

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

export { getAllTags, createTag };
