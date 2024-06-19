import { DeleteColumnData } from "@/types/column";
import { poster, deleted } from "../utils/api";

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
		const response = await deleted(`/delete-columns`, { id, board: data });
		console.log("deleted", response);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};
