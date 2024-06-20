import type { Priority } from "domain/entities/priority"

export interface IPriorityDatabaseProvider {
    createPriority: (name: string, deleted: boolean, level: string) => Promise<Priority>
    loadAllPriority: () => Promise<Priority[]>
    deletedPriority: (id: string) => Promise<void>
    loadSpecificPriority: (id: string) => Promise<Priority>
}