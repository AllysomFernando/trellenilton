import BoardForm from "@/components/Board/BoardForm";
import { fetchBoardById, updateBoard } from "@/services/boardServices";
import { Board } from "@/types/board";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export const BoardePage = () => {
    const router = useRouter();
    const { id } = router.query;    
    const [board, setBoard] = useState<Board | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBoard = async () => {
            if(id){
                try{
                    const boardData = await fetchBoardById(id as string);   
                    setBoard(boardData);
                }catch(error){
                    console.error('Failed to fetch board:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        getBoard();
    }, [id]);

    const handleUpdate = async (updatedData: {name: string, deleted: boolean}) => {
        if(id && board){
            try{
                const updatedBoard = await updateBoard(id as string, updatedData);
                setBoard(updatedBoard);
            }catch(error){
                console.error('Failed to update board:', error);
                alert('Failed to update board. Please try again.');
            }
        }
    };

    if(isLoading){
        return <p>Loading...</p>
    }

    if(!board){
        return <p>Board not found.</p>
    }

    return (
        <div>
            <h1>{board.name}</h1>
            <BoardForm boardId={id as string} initialData={{name: board.name}} onSubmit={handleUpdate} />
        </div>
    )

}