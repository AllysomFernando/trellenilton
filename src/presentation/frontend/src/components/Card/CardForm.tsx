import React, { useState } from "react";
import { Quote } from "@/types/board";

interface AddCardFormProps {
	columnId: string;
	onAddCard: (columnId: string, card: Quote) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ columnId, onAddCard }) => {
	const [content, setContent] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (content.trim() === "") {
			alert("Please enter card content.");
			return;
		}
		const newCard = {
			id: Date.now().toString(),
			content,
		};
		onAddCard(columnId, newCard);
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<label className="block mb-2">
				Card Content:
				<input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</label>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Add Card
			</button>
		</form>
	);
};

export default AddCardForm;
