import { AxiosInstance } from "axios";
import { axiosIntance as axios } from ".";
import { User } from "../interface/User";

const getUser = async (userId: string) => {
	try {
		const res = await axios.get(`/user/${userId}`);
		return res.data;
	} catch (err) {
		return null;
	}
};

const updateUser = async (
	userId: string,
	newData: Partial<User>,
	token: string,
	axiosJWT: AxiosInstance
) => {
	try {
		const res = await axiosJWT.put(
			`/user/${userId}`,
			{ ...newData },
			{ headers: { authorization: `Beaer ${token}` } }
		);
		return res.data;
	} catch (err) {
		return null;
	}
};

export { getUser, updateUser };
