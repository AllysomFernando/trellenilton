import { deleteBoard } from "@/services/boardServices";
import type { NextApiRequest, NextApiResponse } from "next";

type UpdateBoardData = {
	success: boolean;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<UpdateBoardData>
) => {
	switch (req.method) {
		case "PUT":
			return res.json({ success: true });
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
