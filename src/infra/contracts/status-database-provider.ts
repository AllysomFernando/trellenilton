import type { Status } from "domain/entities/status";

export interface IStatusDatabaseProvider {
	createStatus: (
		name: string,
		deleted: boolean,
		description: string
	) => Promise<Status>;
	loadAllStatus: () => Promise<Status[]>;
	deletedStatus: (id: string) => Promise<void>;
	loadSpecificStatus: (id: string) => Promise<Status>;
}
