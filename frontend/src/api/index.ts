import axios from "axios";

const API_URL = "http://localhost:4000";
const axiosIntance = axios.create({
	baseURL: API_URL,
});


export { API_URL, axiosIntance,  };