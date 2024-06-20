import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NewCard } from "@/types/board";

interface NewCardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (newCard: NewCard) => void;
}

const NewCardModal: React.FC<NewCardModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [idPriority, setIdPriority] = useState("");
	const [idCategory, setIdCategory] = useState("");
	const [idStatus, setIdStatus] = useState("");
	const [createdAt, setCreatedAt] = useState("");
	const [isRecurring, setIsRecurring] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			setTitle("");
			setDescription("");
			setIdPriority("");
			setIdCategory("");
			setIdStatus("");
			setCreatedAt("");
			setIsRecurring(false);
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() === "") {
			alert("Please enter a card title.");
			return;
		}
		const newCard: NewCard = {
			title,
			description,
			idPriority,
			idCategory,
			idStatus,
			createdAt,
			deleted: false,
			isRecurring,
		};
		onSubmit(newCard);
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
											Criar Cartão
										</Dialog.Title>
										<div className="mt-2">
											<form onSubmit={handleSubmit}>
												<label className="block text-sm font-bold mb-2">
													Título:
													<input
														type="text"
														value={title}
														onChange={(e) => setTitle(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Descrição:
													<input
														type="text"
														value={description}
														onChange={(e) => setDescription(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Prioridade:
													<input
														type="text"
														value={idPriority}
														onChange={(e) => setIdPriority(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Categoria:
													<input
														type="text"
														value={idCategory}
														onChange={(e) => setIdCategory(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Status:
													<input
														type="text"
														value={idStatus}
														onChange={(e) => setIdStatus(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Criado Em:
													<input
														type="text"
														value={createdAt}
														onChange={(e) => setCreatedAt(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Recorrente:
													<input
														type="checkbox"
														checked={isRecurring}
														onChange={(e) => setIsRecurring(e.target.checked)}
														className="mt-1 p-2"
													/>
												</label>
												<div className="flex justify-end space-x-2 mt-4">
													<button
														type="submit"
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														Criar Cartão
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

export default NewCardModal;
