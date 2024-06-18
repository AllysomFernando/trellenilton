import Link from "next/link";
import { deleteBoard } from "../../services/boardServices";
import { Board } from "@/types/board";

interface BoardProps {
	board: Board;
}

const BoardItem = ({ board }: BoardProps) => {
	const handleDelete = async () => {
		try {
			const deleted = await deleteBoard(board.id, { deleted: true });
			console.log("deleted inside of component", deleted);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
			<Link
				id="Name"
				className="text-blue-500 hover:underline"
				href={`/boards/${board.id}`}
			>
				{board.name}
			</Link>
			<button
				onClick={handleDelete}
				className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
			>
				Delete
			</button>
		</div>
	);
};
export default BoardItem;
