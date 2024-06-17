export interface Board {
	id: string;
	name: string;
	deleted: boolean;
}

export interface UpdateBoardData {
	name: string;
}

export interface DeleteBoardData {
	deleted: boolean;
}
