import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { fetcher } from "@/utils/api";
import { Category, NewCard, Priority, Status } from "@/types/board";

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
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [priority, setPriority] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [status, setStatus] = useState<string>("");
	const [priorities, setPriorities] = useState<Priority[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [statuses, setStatuses] = useState<Status[]>([]);

	useEffect(() => {
		// Carregar as prioridades
		fetcher("/api/priorities").then((response) => {
			setPriorities(response);
		});

		// Carregar as categorias
		fetcher("/api/categories").then((response) => {
			setCategories(response);
		});

		// Carregar os status
		fetcher("/api/status").then((response) => {
			setStatuses(response);
		});
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newCard: NewCard = {
			title,
			description,
			idPriority: priority,
			idCategory: category,
			idStatus: status,
			createdAt: new Date().toISOString(),
			deleted: false,
		};
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
											Adicionar Cartão
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
														required
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Descrição:
													<textarea
														value={description}
														onChange={(e) => setDescription(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
														required
													/>
												</label>
												<label className="block text-sm font-bold mb-2">
													Prioridade:
													<select
														value={priority}
														onChange={(e) => setPriority(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
														required
													>
														<option value="">Selecione a Prioridade</option>
														{priorities &&
															priorities.map((p) => (
																<option key={p.id} value={p.id}>
																	{p.name}
																</option>
															))}
													</select>
												</label>
												<label className="block text-sm font-bold mb-2">
													Categoria:
													<select
														value={category}
														onChange={(e) => setCategory(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
														required
													>
														<option value="">Selecione a Categoria</option>
														{category &&
															categories.map((c) => (
																<option key={c.id} value={c.id}>
																	{c.name}
																</option>
															))}
													</select>
												</label>
												<label className="block text-sm font-bold mb-2">
													Status:
													<select
														value={status}
														onChange={(e) => setStatus(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
														required
													>
														<option value="">Selecione o Status</option>
														{statuses &&
															statuses.map((s) => (
																<option key={s.id} value={s.id}>
																	{s.name}
																</option>
															))}
													</select>
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
