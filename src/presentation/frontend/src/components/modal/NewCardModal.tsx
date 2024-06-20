import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createCard } from "@/services/cardService";
import { Card } from "@/types/board";

interface CreateCardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (newCard: Card) => void;
	priorities: string[];
	categories: string[];
	statuses: string[];
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	priorities,
	categories,
	statuses,
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [idPriority, setIdPriority] = useState("");
	const [idCategory, setIdCategory] = useState("");
	const [idStatus, setIdStatus] = useState("");
	const [comments, setComments] = useState<string[]>([]);
	const [checklists, setChecklists] = useState<string[]>([]);
	const [isRecurring, setIsRecurring] = useState(false);

	const handleAddComment = () => setComments([...comments, ""]);
	const handleAddChecklist = () => setChecklists([...checklists, ""]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const createdAt = new Date().toISOString();
		const deleted = false;
		const newCard = await createCard({
			title,
			idPriority,
			idCategory,
			idStatus,
			createdAt,
			deleted,
			description,
			comments,
			checklists,
			isRecurring,
		});
		onSubmit(newCard);
		onClose();
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
													Nome:
													<input
														type="text"
														value={title}
														onChange={(e) => setTitle(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Descrição:
													<textarea
														value={description}
														onChange={(e) => setDescription(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Prioridade:
													<select
														value={idPriority}
														onChange={(e) => setIdPriority(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													>
														{priorities.map((priority) => (
															<option key={priority} value={priority}>
																{priority}
															</option>
														))}
													</select>
												</label>
												<label className="block text-sm font-bold mb-2">
													Categoria:
													<select
														value={idCategory}
														onChange={(e) => setIdCategory(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													>
														{categories.map((category) => (
															<option key={category} value={category}>
																{category}
															</option>
														))}
													</select>
												</label>
												<label className="block text-sm font-bold mb-2">
													Status:
													<select
														value={idStatus}
														onChange={(e) => setIdStatus(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
													>
														{statuses.map((status) => (
															<option key={status} value={status}>
																{status}
															</option>
														))}
													</select>
												</label>
												<div className="mt-2">
													<button
														type="button"
														onClick={handleAddComment}
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														Adicionar Comentário
													</button>
													{comments.map((comment, index) => (
														<div key={index} className="mt-1">
															<textarea
																value={comment}
																onChange={(e) =>
																	setComments((prevComments) => {
																		const newComments = [...prevComments];
																		newComments[index] = e.target.value;
																		return newComments;
																	})
																}
																className="p-2 border rounded w-full"
															/>
														</div>
													))}
												</div>
												<div className="mt-2">
													<button
														type="button"
														onClick={handleAddChecklist}
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														Adicionar Checklist
													</button>
													{checklists.map((checklist, index) => (
														<div key={index} className="mt-1">
															<textarea
																value={checklist}
																onChange={(e) =>
																	setChecklists((prevChecklists) => {
																		const newChecklists = [...prevChecklists];
																		newChecklists[index] = e.target.value;
																		return newChecklists;
																	})
																}
																className="p-2 border rounded w-full"
															/>
														</div>
													))}
												</div>
												<div className="mt-2">
													<label className="block text-sm font-bold mb-2">
														<input
															type="checkbox"
															checked={isRecurring}
															onChange={(e) => setIsRecurring(e.target.checked)}
														/>
														Recorrente
													</label>
												</div>
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

export default CreateCardModal;
