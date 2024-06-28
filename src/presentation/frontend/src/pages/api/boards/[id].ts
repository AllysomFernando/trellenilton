import { deleteBoard, updateBoard } from "@/services/boardServices";
import type { NextApiRequest, NextApiResponse } from "next";

type BoardData = {
	success: boolean;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<BoardData>
) => {
	switch (req.method) {
		case "PUT":
			const updated = await updateBoard(req.body.id, req.body);
            console.log("updated -> inside of controller", updated);
            res.status(200).json(updated);		
			case "DELETE":
			const deleted = await deleteBoard(req.body.id, req.body);
            console.log("deleted -> inside of controller", deleted);
            res.status(200).json(deleted);
		default:
			res.setHeader("Allow", ["PUT", "DELETE"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default handler;
