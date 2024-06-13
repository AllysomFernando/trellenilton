import type { NextApiRequest, NextApiResponse } from 'next';
import {getBoards, createBoard } from '../../../presentation/controllers/boardController';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getBoards(res);
            break;
        case 'POST':
            await createBoard(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}