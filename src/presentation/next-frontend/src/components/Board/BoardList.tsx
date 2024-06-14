import { fetchBoards } from "@/services/boardServices";
import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import { Board } from "@/types/board";

const BoardList = () => {
	const [boards, setBoards] = useState<Board[]>([]);

	useEffect(() => {
		const fetchBoardsData = async () => {
			const boards = await fetchBoards();
			console.log("boards", boards);
			if (boards) {
				setBoards(boards);
			}
		};
		fetchBoardsData();
	}, []);
	return (
		<div>
			{boards.map((board) => (
				<BoardItem key={board.id} board={board} />
			))}
		</div>
	);
};

export default BoardList;
