import type { IPriorityDatabaseProvider } from "infra/contracts/priority-database-provider";
import { db } from "../../../main/drizzle";
import { eq } from "drizzle-orm";
import { priority } from "@models/priority";

export class DrizzlePriorityProvider implements IPriorityDatabaseProvider {
	public async createPriority(
		name: string,
		deleted: boolean,
		level: string
	): Promise<any> {
		const result = await db.insert(priority).values({
			name: name,
			deleted: deleted,
			level: level,
		});
		return result;
	}
	public async loadAllPriority(): Promise<any[]> {
		try {
			
			const result = await db.query.priority.findMany();
			return result;
		} catch (error) {
			throw new Error("Could not load all priority", {
				cause: "load-all-priority",
			});
		}
	}
	public async deletedPriority(id: string): Promise<void> {
		try {
			await db
				.update(priority)
				.set({ deleted: true })
				.where(eq(priority.id, id))
				.execute();
		} catch (error) {
			console.error(error);
		}
	}
	public async loadSpecificPriority(id: string): Promise<any> {
		try {
			const result = await db.query.priority.findFirst({
				where: eq(priority.id, id),
			});
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}
