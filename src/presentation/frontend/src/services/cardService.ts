import { Card } from "@/types/board";
import { poster } from "@/utils/api";
export const createCard = async (cardData: {
	title: string;
	idPriority: string;
	idCategory: string;
	idStatus: string;
	createdAt: string;
	deleted: boolean;
	description?: string;
	updatedAt?: string;
	endedAt?: string;
	comments?: string[];
	checklists?: string[];
	isRecurring?: boolean;
}): Promise<Card> => {
	try {
		const response = await poster("/api/create-cards", cardData);
		return response.data;
	} catch (error) {
		throw new Error("Failed to create card");
	}
};
