import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { poster, fetcher } from "@/utils/api";
import NewPriorityModal from "@/components/modal/NewPriorityModal";
import NewCategoryModal from "@/components/modal/NewCategoryModal";
import NewStatusModal from "@/components/modal/NewStatusModal";

interface NewCardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (newCard: {
		title: string;
		description: string;
		idPriority: string;
		idCategory: string;
		idStatus: string;
		createdAt: string;
		deleted: boolean;
	}) => void;
}

const NewCardModal: React.FC<NewCardModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("");
	const [priorities, setPriorities] = useState<{ id: string; name: string }[]>(
		[]
	);
	const [categories, setCategories] = useState<{ id: string; name: string }[]>(
		[]
	);
	const [statuses, setStatuses] = useState<{ id: string; name: string }[]>([]);
	const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

	useEffect(() => {
		fetcher("/api/priorities").then((data) => setPriorities(data));
		fetcher("/api/categories").then((data) => setCategories(data));
		fetcher("/api/status").then((data) => setStatuses(data));
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newCard = {
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
		<>
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
													<label className="block text-sm  text-gray-900 font-bold mb-2">
														Título:
														<input
															type="text"
															value={title}
															onChange={(e) => setTitle(e.target.value)}
															className="mt-1 p-2 border text-white rounded w-full"
															required
														/>
													</label>
													<label className="block text-sm text-gray-900 font-bold mb-2">
														Descrição:
														<textarea
															value={description}
															onChange={(e) => setDescription(e.target.value)}
															className="mt-1 p-2 border text-white rounded w-full"
															required
														/>
													</label>
													<label className="block text-sm  text-gray-900 font-bold mb-2">
														Prioridade:
														<select
															value={priority}
															onChange={(e) => setPriority(e.target.value)}
															className="mt-1 p-2 border text-white rounded w-full"
															required
														>
															<option value="">Selecione a Prioridade</option>
															{priorities &&
																priorities.map(
																	(p: { id: string; name: string }) => (
																		<option key={p.id} value={p.id}>
																			{p.name}
																		</option>
																	)
																)}
														</select>
														<button
															type="button"
															onClick={() => setIsPriorityModalOpen(true)}
														>
															Adicionar Prioridade
														</button>
													</label>
													<label className="block text-sm text-gray-900 font-bold mb-2">
														Categoria:
														<select
															value={category}
															onChange={(e) => setCategory(e.target.value)}
															className="mt-1 p-2 border text-white  rounded w-full"
															required
														>
															<option value="">Selecione a Categoria</option>
															{categories &&
																categories.map(
																	(c: { id: string; name: string }) => (
																		<option key={c.id} value={c.id}>
																			{c.name}
																		</option>
																	)
																)}
														</select>
														<button
															type="button"
															onClick={() => setIsCategoryModalOpen(true)}
														>
															Adicionar Categoria
														</button>
													</label>
													<label className="block text-sm text-gray-900 font-bold mb-2">
														Status:
														<select
															value={status}
															onChange={(e) => setStatus(e.target.value)}
															className="mt-1 p-2 border rounded w-full"
															required
														>
															<option value="">Selecione o Status</option>
															{statuses &&
																statuses.map(
																	(s: { id: string; name: string }) => (
																		<option key={s.id} value={s.id}>
																			{s.name}
																		</option>
																	)
																)}
														</select>
														<button
															type="button"
															onClick={() => setIsStatusModalOpen(true)}
														>
															Adicionar Status
														</button>
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
			<NewPriorityModal
				isOpen={isPriorityModalOpen}
				onClose={() => setIsPriorityModalOpen(false)}
				onAdd={(priority) => setPriorities([...priorities, priority])}
			/>
			<NewCategoryModal
				isOpen={isCategoryModalOpen}
				onClose={() => setIsCategoryModalOpen(false)}
				onAdd={(category) => setCategories([...categories, category])}
			/>
			<NewStatusModal
				isOpen={isStatusModalOpen}
				onClose={() => setIsStatusModalOpen(false)}
				onAdd={(status) => setStatuses([...statuses, status])}
			/>
		</>
	);
};

export default NewCardModal;
