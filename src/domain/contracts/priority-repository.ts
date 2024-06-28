import type { Priority } from "domain/entities/priority";

export interface IPriorityRepository {
	createPriority: (
		name: string,
		deleted: boolean,
		level: string
	) => Promise<Priority>;
	loadAllPriority: () => Promise<Priority[]>;
	loadSpecificPriority: (id: string) => Promise<Priority>;
	deletePriority: (id: string) => Promise<void>;
}
