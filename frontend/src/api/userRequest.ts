import { axiosIntance as axios } from ".";

const getUser = async (userId: string) => {
	try {
		const res = await axios.get(`/user/${userId}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

export { getUser };
