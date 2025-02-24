import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateColumn } from "@/services/columnService"; // Adicione a importação

interface EditColumnModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (columnId: string, title: string) => void;
	columnId: string;
	initialTitle: string;
}

const EditColumnModal: React.FC<EditColumnModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	columnId,
	initialTitle,
}) => {
	const [title, setTitle] = useState(initialTitle);

	useEffect(() => {
		setTitle(initialTitle);
	}, [initialTitle]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() === "") {
			alert("Please enter a column title.");
			return;
		}
		await updateColumn(columnId, { name: title }); // Chamar updateColumn
		onSubmit(columnId, title);
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
											Editar Coluna
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
												<div className="flex justify-end space-x-2 mt-4">
													<button
														type="submit"
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														Atualizar
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

export default EditColumnModal;
