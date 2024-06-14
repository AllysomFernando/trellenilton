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
		<div>
			<Link id="Name" href={`/boards/${board.id}`}>
				{board.name}
			</Link>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};
export default BoardItem;
