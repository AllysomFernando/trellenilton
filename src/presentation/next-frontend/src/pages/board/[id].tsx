import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Board } from "@/components/Board/Boards";
import { fetchBoardById } from "@/services/boardServices";
import { QuoteMap } from "@/types/board";

const BoardPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [boardData, setBoardData] = useState<QuoteMap | null>(null);

	useEffect(() => {
		const loadBoard = async () => {
			if (id) {
				const data = await fetchBoardById(id as string);
				setBoardData(data);
			}
		};
		loadBoard();
	}, [id]);

	if (!boardData) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Board</h1>
			<Board initial={boardData} />
		</div>
	);
};

export default BoardPage;
