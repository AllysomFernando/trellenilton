import { db } from "../../../main/drizzle";
import { eq } from "drizzle-orm";
import type { IColumnDatabseProvider } from "../../contracts/column-database-provider";
import { column } from "../models";
export class DrizzleColumnProvider implements IColumnDatabseProvider {
	public async createColumn(
		name: string,
		deleted: boolean,
		description: string,
		idBoard: string
	): Promise<any> {
		const result = await db.insert(column).values({
			name: name,
			deleted: deleted,
			description: description,
			idBoard: idBoard,
		});
		return result;
	}
	public async loadAllColumns(): Promise<any[]> {
		try {
			const result = await db.query.column.findMany();
			return result;
		} catch (error) {
			throw new Error("Could not load all columns", {
				cause: "load-all-columns",
			});
		}
	}
	public async deleteColumn(id: string): Promise<void> {
		try {
			await db
				.update(column)
				.set({ deleted: true })
				.where(eq(column.id, id))
				.execute();
		} catch (error) {
			console.error(error);
		}
	}
	public async updateColumn(id: string, name: string): Promise<any> {
		try {
			const result = await db
				.update(column)
				.set({ name: name })
				.where(eq(column.id, id))
				.execute();
			return result;
		} catch (error) {
			console.error(error);
		}
	}
	public async loadSpecificColumn(id: string): Promise<any> {
		try {
			const result = await db.query.column.findFirst({
				where: eq(column.id, id),
			});
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}
