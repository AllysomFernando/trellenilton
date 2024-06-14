import api, { fetcher, poster } from "../utils/api";
import { Board, UpdateBoardData } from "../types/board";

export const fetchBoards = async () => {
	try {
		const response = await fetcher("/boards");
		console.log("response ==>", response);
		if (response) {
			return response;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};
export const createBoard = async (data: {
	name: string;
}): Promise<Board | undefined> => {
	try {
		const response = await poster("/create-boards", data);
		return response;
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

export const deleteBoard = async (id: string, data: UpdateBoardData) => {
	try {
		const response = await poster(`/boards/${id}`, data);
		console.log("deleted", response);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};
