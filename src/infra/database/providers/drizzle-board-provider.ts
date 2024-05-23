import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import type { IBoardDatabaseProvider } from "../../contracts/board-database-provider";
import { board } from "../models";
import type { Board } from "../../../domain/entities/board";
export class DrizzleBoardProvider implements IBoardDatabaseProvider {
	public async loadAllBoards(): Promise<any[]> {
		const result = await db.query.board.findMany({
			with: {
				cards: true,
			},
		});
		return result;
	}

	public async createBoard(boardCreate: Board): Promise<any> {
		const result = await db.insert(board).values({
			id: boardCreate.id.toString(),
			name: boardCreate.name,
			deleted: "0",
			createdAt: boardCreate.createdAt,
		});
		return result;
	}

	//TODO: verificar se eh a maneira correta passar esse board aqui
	public async deleteBoard(board: any, id: string): Promise<any> {
		const result = await db
			.update(board)
			.set({ deleted: false })
			.where(eq(board.id, id))
			.execute();
		return result;
	}
}
