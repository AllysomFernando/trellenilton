import { Card, Priority, Status } from "@/types/board";
import { fetcher, poster } from "@/utils/api";

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

export const createPriority = async (data: {
	name: string;
	level: string;
	deleted: boolean;
}): Promise<Priority | undefined> => {
	try {
		const response = await poster("/create-priority", data);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};

export const createStatus = async (data: {
	name: string;
	description: string;
	deleted: boolean;
}): Promise<Status | undefined> => {
	try {
		const response = await poster("/create-status", data);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};

export const createCategory = async (data: {
	name: string;
	description: string;
	deleted: boolean;
}): Promise<Status | undefined> => {
	try {
		const response = await poster("/create-category", data);
		return response;
	} catch (error) {
		console.log(error);
	}
	return undefined;
};

export const fetchPriority = async () => {
	try {
		const response = await fetcher("/boards", {});
		console.log("response ==>", response);
		if (response) {
			return response;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchCategory = async () => {
	try {
		const response = await fetcher("/categories", {});
		console.log("response ==>", response);
		if (response) {
			return response;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchStatus = async () => {
	try {
		const response = await fetcher("/status", {});
		console.log("response ==>", response);
		if (response) {
			return response;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};
