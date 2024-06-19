import { poster } from "../utils/api";

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
