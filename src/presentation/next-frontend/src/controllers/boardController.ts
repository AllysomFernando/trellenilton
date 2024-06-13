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
