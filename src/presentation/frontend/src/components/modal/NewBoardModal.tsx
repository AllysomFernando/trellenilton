import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createBoard, updateBoard } from "../../services/boardServices";

interface NewBoardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (updatedData: {
		id: string;
		name: string;
		deleted: boolean;
	}) => void;
	initialData?: { name: string };
	boardId?: string;
}

const NewBoardModal = ({
	isOpen,
	onClose,
	onSubmit,
	initialData,
	boardId,
}: NewBoardModalProps) => {
	const [name, setName] = useState("");

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
				onSubmit(updatedBoard || { name: "", deleted: false });
			} else {
				const newBoard = await createBoard({ name });
				onSubmit(newBoard || { id: "", name: "", deleted: false });
			}
            window.location.reload();
			onClose();
		} catch (error) {
			console.error("Failed to save board:", error);
			alert("Failed to save board. Please try again.");
		}
	};

	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
				</Transition.Child>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title
											as="h3"
											className="text-lg leading-6 font-medium text-gray-900"
										>
											{boardId ? "Editar Quadro" : "Criar Quadro"}
										</Dialog.Title>
										<div className="mt-2">
											<form onSubmit={handleSubmit}>
												<label className="block text-white text-sm font-bold mb-2">
													Nome:
													<input
														type="text"
														value={name}
														onChange={(e) => setName(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<div className="flex justify-end space-x-2 mt-4">
													<button
														type="submit"
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														{boardId ? "Atualizar" : "Criar"} Quadro
													</button>
													<button
														type="button"
														onClick={onClose}
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														Cancelar
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default NewBoardModal;
