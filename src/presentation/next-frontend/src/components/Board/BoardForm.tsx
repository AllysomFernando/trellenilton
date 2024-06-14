import React, { useState } from "react";
import { createBoard, updateBoard } from "../../services/boardServices";

interface BoardFormProps {
	boardId?: string;
	initialData?: { name: string };
	onSubmit: (updatedData: { name: string; deleted: boolean }) => void;
}

export const BoardForm = ({
	boardId,
	initialData,
	onSubmit,
}: BoardFormProps) => {
	const [name, setName] = useState(initialData ? initialData.name : "");

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
				const updatedBoard = await updateBoard(boardId, {
					name,
					deleted: false,
				});
				if (onSubmit) {
					onSubmit(updatedBoard || { name: "", deleted: false });
				}
			} else {
				const newBoard = await createBoard({ name });
				if (onSubmit) {
					onSubmit(newBoard || { name: "", deleted: false });
				}
			}
			window.location.reload();
		} catch (error) {
			console.error("Failed to save board:", error);
			alert("Failed to save board. Please try again.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<button type="submit">{boardId ? "Update" : "Create"} Board</button>
		</form>
	);
};

export default BoardForm;
