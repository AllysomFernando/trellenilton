import React, { useState } from "react";
import { Quote } from "@/types/board";

interface AddCardFormProps {
	columnId: string;
	onAddCard: (columnId: string, card: Quote) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ columnId, onAddCard }) => {
	const [content, setContent] = useState("");
	const [isAdding, setIsAdding] = useState(false);

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
		setIsAdding(false);
	};

	return (
		<div className="mt-4">
			{isAdding ? (
				<form onSubmit={handleSubmit} className="mb-4">
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Insira um título para este cartão..."
						className="w-full p-2 border border-gray-300 rounded resize-none"
					/>
					<div className="flex items-center mt-2">
						<button
							type="submit"
							className="bg-slate-700 text-white-700  py-2 rounded hover:bg-slate-800 w-full font-semibold text-sm uppercase tracking-wider text-center border border-slate-700 hover:border-slate-800 transition duration-200 ease-in-out mt-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-opacity"
						>
							Adicionar Cartão
						</button>
						<button
							type="button"
							onClick={() => setIsAdding(false)}
							className="ml-2 text-white hover:text-gray-700 font-bold"
						>
							X
						</button>
					</div>
				</form>
			) : (
				<button
					onClick={() => setIsAdding(true)}
					className="bg-slate-700 text-white-700  py-2 rounded hover:bg-slate-800 w-full font-semibold text-sm uppercase tracking-wider text-center border border-slate-700 hover:border-slate-800 transition duration-200 ease-in-out mt-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-opacity"
				>
					+ Adicionar outro cartão
				</button>
			)}
		</div>
	);
};

export default AddCardForm;
