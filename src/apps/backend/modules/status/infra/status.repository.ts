import type { IStatusRepository } from "domain/contracts/status-repository";
import type { Status } from "domain/entities/status";
import type { IStatusDatabaseProvider } from "infra/contracts/status-database-provider";

export class StatusRepository implements IStatusRepository {
	constructor(private readonly db: IStatusDatabaseProvider) {}

	public async loadAllStatus(): Promise<Status[]> {
		const data = await this.db.loadAllStatus();
		return data.map((status) => ({
			id: status.id,
			name: status.name,
			deleted: status.deleted,
			description: status.description,
		}));
	}
	public async loadSpecificStatus(id: string): Promise<Status> {
		const data = await this.db.loadSpecificStatus(id);
		return {
			id: data.id,
			name: data.name,
			deleted: data.deleted,
			description: data.description,
		};
	}
	public async createStatus(
		name: string,
		deleted: boolean,
		description: string
	): Promise<Status> {
		const data = await this.db.createStatus(name, deleted, description);
		return {
			id: data.id,
			name: data.name,
			deleted: deleted,
			description: data.description,
		};
	}
	public async deleteStatus(id: string): Promise<void> {
		const data = await this.db.deletedStatus(id);
		return data;
	}
}
