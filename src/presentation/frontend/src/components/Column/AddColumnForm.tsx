import React, { useState } from "react";

interface AddColumnFormProps {
	onAddColumn: (title: string) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onAddColumn }) => {
	const [title, setTitle] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() === "") {
			alert("Please enter a column name.");
			return;
		}
		onAddColumn(title);
		setTitle("");
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<label className="block mb-2">
				Column Name:
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</label>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Add Column
			</button>
		</form>
	);
};

export default AddColumnForm;
