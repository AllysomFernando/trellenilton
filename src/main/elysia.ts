import { setupCreateBoards } from "domain/features/create-boards";
import Elysia, { t } from "elysia";
import { cors } from "@elysiajs/cors";
import { DrizzleBoardProvider } from "infra/database/providers/drizzle-board-provider";
import { BoardRepository } from "infra/repositories/board-repository";
import { setupDisplayBoards } from "domain/features/display-boards";
import { setupDisplayBoard } from "domain/features/display-board";
import { setupDeleteBoard } from "domain/features/delete-board";
import { setupUpdateBoard } from "domain/features/update-board";
import { ColumnRepository } from "infra/repositories/column-repository";
import { DrizzleColumnProvider } from "infra/database/providers/drizzle-column-provider";
import { setupDisplayColumn } from "domain/features/display-column";
import { setupCreateColumn } from "domain/features/create-column";
import { SetupDeleteColumn } from "domain/features/delete-column";
import { setupUpdateColumn } from "domain/features/update-column";
import { CardRepository } from "infra/repositories/card-repository";
import { DrizzleCardProvider } from "infra/database/providers/drizzle-card-provider";
import { SetupCreateCard } from "domain/features/create-card";
import { PriorityRepository } from "infra/repositories/priority-repository";
import { setupCreatePriority } from "domain/features/create-priority";
import { setupDeletePriority } from "domain/features/delete-priority";
import { setupDisplayPrioritys } from "domain/features/display-prioritys";
import { setupDisplayPriority } from "domain/features/display-priority";
import { DrizzlePriorityProvider } from "infra/database/providers/drizzle-priority-provider";
import { CategoryRepository } from "infra/repositories/category-repository";
import { DrizzleCategoryProvider } from "infra/database/providers/drizzle-category-provider";
import { StatusRepository } from "infra/repositories/status-repository";
import { DrizzleStatusProvider } from "infra/database/providers/drizzle-status-provider";
import { setupCreateStatus } from "domain/features/create-status";
import { setupDisplaySingleStatus } from "domain/features/display-single-status";
import { SetupDisplayStatus } from "domain/features/display-status";
import { setupDeleteStatus } from "domain/features/delete-status";
import { setupDisplayCategory } from "domain/features/display-category";
import { setupDeleteCategory } from "domain/features/delete-category";
import { setupCreateCategory } from "domain/features/create-category";
import { SetupDisplayCategories } from "domain/features/display-categories";

const boardRepository = new BoardRepository(new DrizzleBoardProvider());
const columnRepository = new ColumnRepository(new DrizzleColumnProvider());
const cardRepository = new CardRepository(new DrizzleCardProvider());
const priorityRepository = new PriorityRepository(
	new DrizzlePriorityProvider()
);
const categoryRepository = new CategoryRepository(
	new DrizzleCategoryProvider()
);
const statusRepository = new StatusRepository(new DrizzleStatusProvider());

new Elysia()
	.use(cors())
	.get("/health", () => "it's healthy")
	.decorate("createStatus", setupCreateStatus({ repository: statusRepository }))
	.decorate(
		"loadAllStatus",
		SetupDisplayStatus({ repository: statusRepository })
	)
	.decorate("deleteStatus", setupDeleteStatus({ repository: statusRepository }))
	.decorate(
		"loadSingleStatus",
		setupDisplaySingleStatus({ repository: statusRepository })
	)
	.decorate(
		"loadAllCategory",
		SetupDisplayCategories({ repository: categoryRepository })
	)
	.decorate(
		"loadSingleCategory",
		setupDisplayCategory({ repository: categoryRepository })
	)
	.decorate(
		"createCategory",
		setupCreateCategory({ repository: categoryRepository })
	)
	.decorate(
		"deleteCategory",
		setupDeleteCategory({ repository: categoryRepository })
	)
	.decorate(
		"createService",
		setupCreateBoards({
			repository: boardRepository,
		})
	)
	.decorate(
		"fetchService",
		setupDisplayBoards({
			repository: boardRepository,
		})
	)
	.decorate(
		"fetchSpecificBoardService",
		setupDisplayBoard({
			repository: boardRepository,
		})
	)
	.decorate(
		"deleteService",
		setupDeleteBoard({
			repository: boardRepository,
		})
	)
	.decorate(
		"updateService",
		setupUpdateBoard({
			repository: boardRepository,
		})
	)
	.decorate(
		"displayColumnService",
		setupDisplayColumn({
			repository: columnRepository,
		})
	)
	.decorate(
		"createColumnService",
		setupCreateColumn({
			repository: columnRepository,
		})
	)
	.decorate(
		"deleteColumnService",
		SetupDeleteColumn({
			repository: columnRepository,
		})
	)
	.decorate(
		"updateColumnService",
		setupUpdateColumn({
			repository: columnRepository,
		})
	)
	.decorate(
		"createCardService",
		SetupCreateCard({ repository: cardRepository })
	)
	.decorate(
		"createPriorityService",
		setupCreatePriority({ repository: priorityRepository })
	)
	.decorate(
		"deletePriorityService",
		setupDeletePriority({ repository: priorityRepository })
	)
	.decorate(
		"fetchPriorityService",
		setupDisplayPrioritys({
			repository: priorityRepository,
		})
	)
	.decorate(
		"fetchSiglePriorityService",
		setupDisplayPriority({ repository: priorityRepository })
	)
	.post(
		"api/priority",
		({ body: { id }, fetchSiglePriorityService }) => {
			return fetchSiglePriorityService({ id });
		},
		{ body: t.Object({ id: t.String() }) }
	)
	.post(
		"api/singleStatus",
		({ body: { id }, loadSingleStatus }) => {
			return loadSingleStatus({ id });
		},
		{ body: t.Object({ id: t.String() }) }
	)
	.post(
		"api/category",
		({ body: { id }, loadSingleCategory }) => {
			return loadSingleCategory({ id });
		},
		{ body: t.Object({ id: t.String() }) }
	)
	.post(
		"api/create-status",
		({ body: { name, description, deleted }, createStatus }) => {
			return createStatus({ name, description, deleted });
		},
		{
			body: t.Object({
				name: t.String(),
				description: t.String(),
				deleted: t.Boolean(),
			}),
		}
	)
	.post(
		"api/create-category",
		({ body: { name, description, deleted }, createCategory }) => {
			return createCategory({ name, description, deleted });
		},
		{
			body: t.Object({
				name: t.String(),
				description: t.String(),
				deleted: t.Boolean(),
			}),
		}
	)
	.post(
		"api/create-boards",
		({ body: { name }, createService }) => {
			return createService({ name });
		},
		{
			body: t.Object({
				name: t.String(),
			}),
		}
	)
	.post(
		"api/create-columns",
		({ body: { name, description, idBoard }, createColumnService }) => {
			return createColumnService({ name, description, idBoard });
		},
		{
			body: t.Object({
				name: t.String(),
				description: t.String(),
				idBoard: t.String(),
			}),
		}
	)
	.post(
		"api/create-cards",
		({
			body: {
				idPriority,
				idCategory,
				idStatus,
				title,
				createdAt,
				deleted,
				description,
				updatedAt,
				endedAt,
			},
			createCardService,
		}) => {
			return createCardService({
				title,
				idPriority,
				idCategory,
				idStatus,
				createdAt,
				deleted,
				description,
				updatedAt,
				endedAt,
			});
		},
		{
			body: t.Object({
				idPriority: t.String(),
				idCategory: t.String(),
				idStatus: t.String(),
				title: t.String(),
				createdAt: t.String(),
				deleted: t.Boolean(),
				description: t.String(),
				updatedAt: t.String(),
				endedAt: t.String(),
			}),
		}
	)
	.post(
		"api/create-priority",
		({ body: { name, deleted, level }, createPriorityService }) => {
			return createPriorityService({ name, deleted, level });
		},
		{
			body: t.Object({
				name: t.String(),
				deleted: t.Boolean(),
				level: t.String(),
			}),
		}
	)
	.delete(
		"api/delete-boards",
		({ body: { id, board }, deleteService }) => {
			return deleteService({ id, board });
		},
		{
			body: t.Object({
				id: t.String(),
				board: t.Object({
					deleted: t.Boolean(),
				}),
			}),
		}
	)
	.delete(
		"api/delete-priority",
		({ body: { id, priority }, deletePriorityService }) => {
			return deletePriorityService({ id, priority });
		},
		{
			body: t.Object({
				id: t.String(),
				priority: t.Object({
					deleted: t.Boolean(),
				}),
			}),
		}
	)
	.delete(
		"api/delete-status",
		({ body: { id, status }, deleteStatus }) => {
			return deleteStatus({ id, status });
		},
		{
			body: t.Object({
				id: t.String(),
				status: t.Object({
					deleted: t.Boolean(),
				}),
			}),
		}
	)
	.delete(
		"api/delete-category",
		({ body: { id, category }, deleteCategory }) => {
			return deleteCategory({ id, category });
		},
		{
			body: t.Object({
				id: t.String(),
				category: t.Object({
					deleted: t.Boolean(),
				}),
			}),
		}
	)
	.delete(
		"api/delete-columns",
		({ body: { id, column }, deleteColumnService }) => {
			return deleteColumnService({ id, column });
		},
		{
			body: t.Object({
				id: t.String(),
				column: t.Object({
					deleted: t.Boolean(),
				}),
			}),
		}
	)
	.put(
		"/api/update-boards",
		({ body: { id, board }, updateService }) => {
			return updateService({ id, board });
		},
		{
			body: t.Object({
				id: t.String(),
				board: t.Object({
					name: t.String(),
				}),
			}),
		}
	)
	.put(
		"/api/update-columns",
		({ body: { id, column }, updateColumnService }) => {
			return updateColumnService({ id, column });
		},
		{
			body: t.Object({
				id: t.String(),
				column: t.Object({
					name: t.String(),
				}),
			}),
		}
	)
	.get("/api/boards", ({ fetchService }) => {
		return fetchService({});
	})
	.get("api/priorities", ({ fetchPriorityService }) => {
		return fetchPriorityService({});
	})
	.get("api/status", ({ loadAllStatus }) => {
		return loadAllStatus({});
	})
	.get("api/categories", ({ loadAllCategory }) => {
		return loadAllCategory({});
	})
	.get("/api/columns", ({ displayColumnService }) => {
		return displayColumnService({});
	})
	.post(
		"/api/board",
		({ body: { id }, fetchSpecificBoardService }) => {
			return fetchSpecificBoardService({ id });
		},
		{
			body: t.Object({
				id: t.String(),
			}),
		}
	)
	.listen(3000);
