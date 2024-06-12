import { UpdateBoardData } from "@/types/board";
import api, { fetcher, poster } from "../utils/api";

export const getBoards = async () => {
	return await fetcher("/boards").then((res) => res.data);
};

export const createBoard = async (data: { name: string }) => {
	return await poster("/boards", data).then((res) => res.data);
};

export const fetchBoard = async (id: string) => {
	return await fetcher(`/boards/${id}`).then((res) => res.data);
};

export const updateBoard = async (id: string, data: UpdateBoardData) => {
	try {
		const response = await api.put(`/boards/${id}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
