import api, { fetcher, poster } from "../utils/api";
import { Board, UpdateBoardData } from "../types/board";

export const fetchBoards = async () => {
	try {
		const response = await fetcher("/boards");
		if (response.data) {
			return response.data;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};
export const createBoard = async (data: { name: string }): Promise<Board | undefined> => {
	try {
	   const response = await poster('/create-boards', data);
	   return response.data;
	} catch (error) {
	   console.log(error);
	}
	return undefined;
};

export const fetchBoardById = async (id: string) => {
	const response = await fetcher(`/boards/${id}`);
	return response.data;
};

export const updateBoard = async (id: string, data: UpdateBoardData) => {
	const response = await poster(`/boards/${id}`, data);
	return response.data;
};

export const deleteBoard = async (id: string) => {
	const response = await api.delete(`/boards/${id}`);
	return response.data;
};
