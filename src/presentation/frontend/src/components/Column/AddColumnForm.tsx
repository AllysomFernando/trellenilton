import React, { useState } from "react";

interface AddColumnFormProps {
	onAddColumn: (title: string) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onAddColumn }) => {
	const [title, setTitle] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() === "") {
			alert("Please enter a column name.");
			return;
		}
		onAddColumn(title);
		setTitle("");
		setIsAdding(false);
	};

	return (
		<div className="mt-4">
			{isAdding ? (
				<form onSubmit={handleSubmit} className="mb-4">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Insira o título da lista..."
						className="w-full p-2 border border-gray-300 rounded mb-2"
					/>
					<div className="flex items-center ">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
						>
							Adicionar Lista
						</button>
						<button
							type="button"
							onClick={() => setIsAdding(false)}
							className="ml-2 text-gray-500 hover:text-gray-700"
						>
							X
						</button>
					</div>
				</form>
			) : (
				<button
					onClick={() => setIsAdding(true)}
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
				>
					+ Adicionar outra lista
				</button>
			)}
		</div>
	);
};

export default AddColumnForm;
