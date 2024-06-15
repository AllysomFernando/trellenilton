import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status) {
			console.log(error.response.data);
		}
		return Promise.reject(error);
	}
);

export const fetcher = async (url: string, opts?: any) => {
	try {
		const response = await api.get(url, opts);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const poster = async (url: string, data: any) => {
	try {
		const response = await api.post(url, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleted = async (
	url: string,
	data: {
		id: string;
		board: { deleted: boolean };
	}
) => {
	try {
		const response = await axios.delete(
			"http://localhost:3000/api/delete-boards",
			{
				data,
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export default api;
