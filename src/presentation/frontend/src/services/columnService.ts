import { DeleteColumnData, UpdateColumn } from "@/types/column";
import { deletedColumn, poster, updatedColumn } from "../utils/api";

export const createColumn = async (data: {
	name: string;
	description: string;
	idBoard: string;
}): Promise<any> => {
	try {
		const response = await poster("/create-columns", data);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};

export const deleteColumn = async (id: string, data: DeleteColumnData) => {
	try {
		const response = await deletedColumn(`/delete-columns`, {
			id,
			column: data,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};

export const updateColumn = async (id: string, data: UpdateColumn) => {
	try {
		const response = await updatedColumn(`/update-columns`, {
			id,
			column: data,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};
