export interface Board {
    id: string;
    name: string;
    deleted: boolean;
}

export interface UpdateBoardData {
    name?: string;
    cards?: Array<{id: string, idPrioridade: string, idCategoria: string, idStatus: string, title: string, description: string, createdAt: string, updatedAt: string, endedAt: string, deleted: boolean }>
    deleted: boolean;
}