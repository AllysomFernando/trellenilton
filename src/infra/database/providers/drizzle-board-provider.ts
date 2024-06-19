import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import type { IBoardDatabaseProvider } from "../../contracts/board-database-provider";
import { board, column, boardRelations } from "../models";

export class DrizzleBoardProvider implements IBoardDatabaseProvider {
	public async loadAllBoards(): Promise<any[]> {
		try {
			const result = await db.query.board.findMany({
				with: {
					column: true,
				},
			});
			return result;
		} catch (error) {
			console.error(error);
		}
		return [];
	}

	public async loadSpecificBoard(id: string): Promise<any> {
		try {
			const result = await db.query.board.findFirst({
				where: eq(board.id, id),
				with: {
					column: true,
				},
			});
			return result;
		} catch (error) {
			console.error(error);
		}
		return null;
	}

	public async createBoard(name: string): Promise<any> {
		const result = await db.insert(board).values({
			name: name,
			deleted: false,
			createdAt: new Date(),
		});
		return result;
	}

	public async deleteBoard(id: string): Promise<void> {
		try {
			await db
				.update(board)
				.set({ deleted: true })
				.where(eq(board.id, id))
				.execute();
		} catch (error) {
			console.error(error);
		}
	}

	public async updateBoard(id: string, name: string): Promise<any> {
		try {
			const result = await db
				.update(board)
				.set({ name: name })
				.where(eq(board.id, id))
				.execute();
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}
