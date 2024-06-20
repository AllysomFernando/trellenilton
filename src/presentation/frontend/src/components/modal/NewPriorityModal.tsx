import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { poster } from "@/utils/api";

interface NewPriorityModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (priority: { id: string; name: string }) => void;
}

const NewPriorityModal: React.FC<NewPriorityModalProps> = ({
	isOpen,
	onClose,
	onAdd,
}) => {
	const [name, setName] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await poster("/api/create-priority", {
				name,
				deleted: false,
			});
			onAdd(response);
			onClose();
		} catch (error) {
			console.error("Failed to create priority", error);
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
											Adicionar Prioridade
										</Dialog.Title>
										<div className="mt-2">
											<form onSubmit={handleSubmit}>
												<label className="block text-sm font-bold mb-2">
													Nome da Prioridade:
													<input
														type="text"
														value={name}
														onChange={(e) => setName(e.target.value)}
														className="mt-1 p-2 border rounded w-full"
														required
													/>
												</label>
												<div className="flex justify-end space-x-2 mt-4">
													<button
														type="submit"
														className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-900"
													>
														Criar Prioridade
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

export default NewPriorityModal;
