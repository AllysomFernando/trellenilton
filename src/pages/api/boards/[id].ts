import type { NextApiRequest, NextApiResponse } from "next";
import { deleteBoard, updateBoard } from "presentation/controllers/boardController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "PUT":
			await updateBoard(req, res);
            break;
        case 'DELETE':
            await deleteBoard(req, res);
            break;
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};
