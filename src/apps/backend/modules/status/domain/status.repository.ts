import type { Status } from "domain/entities/status";

export interface IStatusRepository {
	createStatus: (
		name: string,
		deleted: boolean,
		description: string
	) => Promise<Status>;
	loadAllStatus: () => Promise<Status[]>;
	loadSpecificStatus: (id: string) => Promise<Status>;
	deleteStatus: (id: string) => Promise<void>;
}
