import type { IPriorityRepository } from "domain/contracts/priority-repository";
import type { Priority } from "domain/entities/priority";
import type { IPriorityDatabaseProvider } from "infra/contracts/priority-database-provider";


export class PriorityRepository implements IPriorityRepository {
	constructor(private readonly db: IPriorityDatabaseProvider) {}

	public async loadAllPriority(): Promise<Priority[]> {
		const data = await this.db.loadAllPriority();
		return data.map((priority) => ({
			id: priority.id,
			name: priority.name,
			deleted: priority.deleted,
            level: priority.level
		}));
	}
	public async loadSpecificPriority(id: string): Promise<Priority> {
		const data = await this.db.loadSpecificPriority(id);
		return {
			id: data.id,
			name: data.name,
			deleted: data.deleted,
			level: data.level,
		};
	}
	public async createPriority(
		name: string,
		deleted: boolean,
		level: string
	): Promise<Priority> {
		const data = await this.db.createPriority(name, deleted, level);
		return {
			id: data.id,
			name: data.name,
			deleted: deleted,
			level: data.level
		};
	}
	public async deletePriority(id: string): Promise<void> {
		const data = await this.db.deletedPriority(id);
		return data;
	}
}
