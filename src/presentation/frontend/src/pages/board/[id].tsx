import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Board from "@/components/Board/Boards";
import { fetchBoardById } from "@/services/boardServices";
import { Board as BoardType } from "@/types/board";

const BoardPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [boardData, setBoardData] = useState<BoardType | null>(null);

	useEffect(() => {
		const loadBoard = async () => {
			if (id) {
				const data = await fetchBoardById(id as string);
				if (data) {
					setBoardData(data);
				}
			}
		};
		loadBoard();
	}, [id]);

	if (!boardData) {
		return <div>Loading...</div>;
	}

	console.log(boardData);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Quadro {boardData.name}</h1>
			<Board initialBoard={boardData} />
		</div>
	);
};

export default BoardPage;
