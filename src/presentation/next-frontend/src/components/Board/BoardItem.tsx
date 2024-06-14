import Link from "next/link";
import { deleteBoard } from "../../services/boardServices";
import { Board } from "@/types/board";

interface BoardProps {
	board: Board;
}

export const BoardItem = ({ board }: BoardProps) => {
	const handleDelete = async () => {
		await deleteBoard(board.id, { deleted: true });
		window.location.reload();
	};

	return (
		<div>
			<Link id="Name" href={`/boards/${board.id}`}>
				{board.name}
			</Link>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};
