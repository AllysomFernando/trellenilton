import type { NextApiRequest, NextApiResponse } from 'next';
import { DrizzleBoardProvider } from "infra/database/providers/drizzle-board-provider";
import { BoardRepository } from "infra/repositories/board-repository";

const boardProvider = new DrizzleBoardProvider();
const boardRepository = new BoardRepository(boardProvider);


export const getBoards = async (res: NextApiResponse) => {
    try{
        const boards = await boardRepository.loadAllBoards();
        res.status(200).json(boards);
    }catch(error: any){
        res.status(500).json({ error: error.message });
    }
}

export const createBoard = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const board = await boardRepository.createBoard(req.body);
        res.status(201).json(board);
    }catch(error: any){
        res.status(500).json({ error: error.message });
    }
}

export const updateBoard = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query;
        const board = await boardRepository.updateBoard(req.body, id as string);
        res.status(200).json(board);
    }catch(error: any){
        res.status(500).json({ error: error.message });
    }
}

export const deleteBoard = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query;
        await boardRepository.deleteBoard(id as string);
        res.status(204).end();
    }catch(error: any){
        res.status(500).json({ error: error.message });
    }
}