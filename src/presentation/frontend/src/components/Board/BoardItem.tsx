import Link from "next/link";
import { deleteBoard } from "../../services/boardServices";
import { Board } from "@/types/board";
import { Menu } from "@headlessui/react";

interface BoardProps {
	board: Board;
	onEdit: () => void;
}

const BoardItem = ({ board, onEdit }: BoardProps) => {
	const handleDelete = async () => {
		try {
			const deleted = await deleteBoard(board.id, { deleted: true });
			console.log("deleted inside of component", deleted);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="relative w-32 h-32 p-4 bg-white shadow-md rounded-lg mb-4 hover:bg-gray-200 hover:cursor-pointer">
			<Link
				href={`/boards/${board.id}`}
				className="absolute inset-0 flex flex-col items-center justify-center text-gray-600"
			>
				{board.name}
			</Link>
			<Menu as="div" className="absolute top-2 right-2">
				<Menu.Button className="text-gray-500 hover:text-gray-700">
					•••
				</Menu.Button>
				<Menu.Items className="absolute right-0 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
					<Menu.Item>
						{({ active }) => (
							<button
								onClick={onEdit}
								className={`${
									active ? "bg-gray-100" : ""
								} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
							>
								Editar
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								onClick={handleDelete}
								className={`${
									active ? "bg-gray-100" : ""
								} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
							>
								Excluir
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Menu>
		</div>
	);
};

export default BoardItem;
