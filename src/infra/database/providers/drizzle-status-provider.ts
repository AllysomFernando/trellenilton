import type { IStatusDatabaseProvider } from "infra/contracts/status-database-provider";
import { db } from "../../../main/drizzle";
import { eq } from "drizzle-orm";
import { status } from "@models/status";

export class DrizzleStatusProvider implements IStatusDatabaseProvider {
	public async createStatus(
		name: string,
		deleted: boolean,
		description: string
	): Promise<any> {
		const result = await db.insert(status).values({
			name: name,
			deleted: deleted,
			description: description,
		});
		return result;
	}
	public async loadAllStatus(): Promise<any[]> {
		try {
			const result = await db.query.status.findMany();
			return result;
		} catch (error) {
			throw new Error("Could not load all status", {
				cause: "load-all-status",
			});
		}
	}
	public async deletedStatus(id: string): Promise<void> {
		try {
			await db
				.update(status)
				.set({ deleted: true })
				.where(eq(status.id, id))
				.execute();
		} catch (error) {
			console.error(error);
		}
	}
	public async loadSpecificStatus(id: string): Promise<any> {
		try {
			const result = await db.query.status.findFirst({
				where: eq(status.id, id),
			});
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}
