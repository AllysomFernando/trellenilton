import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
        case 'GET':
            return res.json({ success: true })
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};
