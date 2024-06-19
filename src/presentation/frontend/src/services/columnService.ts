import { DeleteColumnData } from "@/types/column";
import { deletedColumn, poster } from "../utils/api";

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
		console.log("deleted=====>", response);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};
