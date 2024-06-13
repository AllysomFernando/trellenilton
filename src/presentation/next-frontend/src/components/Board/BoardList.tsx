import { fetchBoards } from '@/services/boardServices';
import React, { useEffect, useState } from 'react';    
import { BoardItem } from './BoardItem';
import { Board } from '@/types/board';
export const BoardList = () => {
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        const getBoards = async () => {
            const boardsData = await fetchBoards();
            setBoards(boardsData);
        };

        fetchBoards();
    }, []);
    return(
        <div>
            {boards.map((board) => (
                <BoardItem key={board.id} board={board} />
            ))}
        </div>
    )
}

