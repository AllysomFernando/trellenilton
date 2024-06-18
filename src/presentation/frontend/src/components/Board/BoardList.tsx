import { fetchBoards } from "@/services/boardServices";
import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import { Board } from "@/types/board";
import BoardForm from "./BoardForm";
import NewBoardModal from "@/components/modal/NewBoardModal";

const BoardList = () => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

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
		setIsEditing(true);
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

	const handleNewBoardSubmit = (newBoard: {
		id: string;
		name: string;
		deleted: boolean;
	}) => {
		setBoards([...boards, newBoard]);
	};

	const handleNewBoardClick = () => {
		setSelectedBoard(null);
		setIsEditing(false);
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
		setSelectedBoard(null);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	const visibleBoards = boards.filter((board) => !board.deleted);
	const hasNoVisibleBoards = visibleBoards.length === 0;

	return (
		<div className="bg-gray-900 min-h-screen p-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl text-white">Meus Quadros</h1>
				<button
					onClick={handleNewBoardClick}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Criar novo quadro
				</button>
			</div>
			<NewBoardModal
				isOpen={isModalOpen}
				onClose={handleClose}
				onSubmit={isEditing ? handleSubmit : handleNewBoardSubmit}
				initialData={selectedBoard ? { name: selectedBoard.name } : undefined}
				boardId={selectedBoard ? selectedBoard.id : undefined}
			/>
			{hasNoVisibleBoards && (
				<BoardForm onSubmit={handleSubmit} onClose={handleClose} />
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{visibleBoards.map((board) => (
					<BoardItem
						key={board.id}
						board={board}
						onEdit={() => handleEdit(board)}
					/>
				))}
			</div>
		</div>
	);
};

export default BoardList;
