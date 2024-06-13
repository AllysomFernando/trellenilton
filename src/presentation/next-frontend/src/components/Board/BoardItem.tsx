import Link from 'next/link';
import { deleteBoard } from '../../services/boardServices';
import { Board } from '@/types/board';

interface BoardProps {
    board: Board;
}

export const BoardItem = ({board}: BoardProps) => {
    const handleDelete = async () => {
        await deleteBoard(board.id);
        window.location.reload();
    }

    return (
        <div>
            <Link href={`/boards/${board.id}`}>
                <a>{board.name}</a>
            </Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}