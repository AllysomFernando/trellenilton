import type { NextApiRequest, NextApiResponse } from "next";
import { createBoard } from "../../../controllers/boardController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "POST":
			await createBoard(req.body.name, res);
			break;
		case "GET":
			return res.json({ success: true });
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default handler;
