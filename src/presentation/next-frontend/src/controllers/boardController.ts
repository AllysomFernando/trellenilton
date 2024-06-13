import { Board } from '@/types/board';
import api from '@/utils/api';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


export const createBoard = async (name: string, res: NextApiResponse) => {
    try{;
        const board = await axios.post<Board>("http://localhost:3001/api/create-boards", {
            name
        })
        res.status(201).json(board);
    }catch(error: any){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}