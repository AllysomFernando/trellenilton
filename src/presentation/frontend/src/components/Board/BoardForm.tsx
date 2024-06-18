import React, { useState, useEffect } from "react";
import { createBoard, updateBoard } from "../../services/boardServices";

interface BoardFormProps {
	boardId?: string;
	initialData?: { name: string };
	onSubmit: (updatedData: { name: string; deleted: boolean }) => void;
	onClose: () => void;
}

const BoardForm = ({
	boardId,
	initialData,
	onSubmit,
	onClose,
}: BoardFormProps) => {
	const [name, setName] = useState(initialData ? initialData.name : "");

	useEffect(() => {
		if (initialData) {
			setName(initialData.name);
		}
	}, [initialData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() === "") {
			alert("Please enter a board name.");
			return;
		}
		if (name.length < 5) {
			alert("Please enter a board name with at least 5 characters");
			return;
		}

		try {
			if (boardId) {
				const updatedBoard = await updateBoard(boardId, { name });
				if (onSubmit) {
					onSubmit(updatedBoard || { name: "", deleted: false });
				}
			} else {
				const newBoard = await createBoard({ name });
				if (onSubmit) {
					onSubmit(newBoard || { name: "", deleted: false });
				}
			}
			onClose();
			window.location.reload();
		} catch (error) {
			console.error("Failed to save board:", error);
			alert("Failed to save board. Please try again.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className="block text-gray-700 text-sm font-bold mb-2">
				Name:
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 p-2 border rounded w-full"
				/>
			</label>
			<div className="flex justify-end space-x-2">
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					{boardId ? "Update" : "Create"} Board
				</button>
				<button
					type="button"
					onClick={onClose}
					className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default BoardForm;
