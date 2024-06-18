import { fetchBoards } from "@/services/boardServices";
import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import { Board } from "@/types/board";
import NewBoardModal from "@/components/modal/NewBoardModal";
import AddBoardButton from "./BoardButtom";

const BoardList = () => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
		setIsModalOpen(true);
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
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Meus Quadros</h2>
			<div className="flex items-start space-x-4">
				{boards
					.filter((board) => !board.deleted)
					.map((board) => (
						<BoardItem
							key={board.id}
							board={board}
							onEdit={() => handleEdit(board)}
						/>
					))}
				<AddBoardButton onClick={() => setIsModalOpen(true)} />
			</div>
			<NewBoardModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				boardId={selectedBoard?.id}
				initialData={selectedBoard ? { name: selectedBoard.name } : undefined}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default BoardList;
