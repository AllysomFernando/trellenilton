import { Board } from "@/types/board";
import api from "@/utils/api";
import type { NextApiResponse } from "next";

export const createBoard = async (name: string, res: NextApiResponse) => {
	try {
		const board = await api.post<Board>("/create-boards", {
			name,
		});
		res.status(201).json(board);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

export const fetchBoard = async (res: NextApiResponse) => {
	try {
		const board = await api.get<Board>(`/boards`);
		res.status(200).json(board);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

export const updateBoard = async (
	id: string,
	res: NextApiResponse
) => {
	try {
		const board = await api.put<Board>(`/update-boards/${id}`);
		console.log("update -> inside of controller", board);
		res.status(200).json(board);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

export const deleteBoard = async (id: string, res: NextApiResponse) => {
	try {
		const board = await api.delete<Board>(`/delete-boards/${id}`);
		console.log("deleted -> inside of controller", board);
		res.status(200).json(board);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

export const fetchBoardById = async (id: string, res: NextApiResponse) => {
	try {
		const board = await api.get<Board>(`/boards/${id}`);
		res.status(200).json(board);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
