import { fetchBoards } from "@/services/boardServices";
import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import { Board } from "@/types/board";
import BoardForm from "./BoardForm";

const BoardList = () => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

	useEffect(() => {
		const fetchBoardsData = async () => {
			const boards = await fetchBoards();
			if (boards) {
				setBoards(boards);
			}
			setLoading(false);
		};
		fetchBoardsData();
	}, []);

	const handleEdit = (board: Board) => {
		setSelectedBoard(board);
	};
	const handleSubmit = (updatedData: { name: string; deleted: boolean }) => {
		setBoards(
			boards.map((board) =>
				board.id === selectedBoard?.id ? { ...board, ...updatedData } : board
			)
		);
		setSelectedBoard(null);
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			{selectedBoard && (
				<BoardForm
					boardId={selectedBoard.id}
					initialData={{ name: selectedBoard.name }}
					onSubmit={handleSubmit}
				/>
			)}
            {boards.filter(board => !board.deleted).map((board) => (
				<div key={board.id}>
					<BoardItem board={board} />
					<button onClick={() => handleEdit(board)}>Edit</button>
				</div>
			))}
		</div>
	);
};

export default BoardList;
