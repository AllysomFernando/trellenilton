import Link from "next/link";
import { deleteBoard } from "../../services/boardServices";
import { Board } from "@/types/board";

interface BoardProps {
	board: Board;
	onEdit: () => void;
}

const BoardItem = ({ board, onEdit }: BoardProps) => {
	const handleDelete = async () => {
		try {
			const deleted = await deleteBoard(board.id, { deleted: true }).then(
				() => {
					window.location.reload();
				}
			);

			console.log("deleted inside of component", deleted);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-start p-4 bg-white shadow-md rounded-lg mb-4">
			<Link
				id="Name"
				className="text-slate-500 hover:underline mb-2"
				href={`/boards/${board.id}`}
			>
				{board.name}
			</Link>
			<div className="flex space-x-2">
				<button
					onClick={onEdit}
					className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
				>
					Editar
				</button>
				<button
					onClick={handleDelete}
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
				>
					Excluir
				</button>
			</div>
		</div>
	);
};
export default BoardItem;
