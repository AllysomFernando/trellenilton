import { setupCreateBoards } from "domain/features/create-boards";
import Elysia, { t } from "elysia";
import { cors } from "@elysiajs/cors";
import { DrizzleBoardProvider } from "infra/database/providers/drizzle-board-provider";
import { BoardRepository } from "infra/repositories/board-repository";
import { setupDisplayBoards } from "domain/features/display-boards";
import { setupDeleteBoard } from "domain/features/delete-board";
import { setupUpdateBoard } from "domain/features/update-board";
import { ColumnRepository } from "infra/repositories/column-repository";
import { DrizzleColumnProvider } from "infra/database/providers/drizzle-column-provider";
import { setupDisplayColumn } from "domain/features/display-column";

const boardRepository = new BoardRepository(new DrizzleBoardProvider());
const columnRepository = new ColumnRepository(new DrizzleColumnProvider());

new Elysia()
	.use(cors())
	.get("/health", () => "it's healthy")
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
		"deleteService",
		setupDeleteBoard({
			repository: boardRepository,
		})
	)
	.decorate("updateService", setupUpdateBoard({
		repository: boardRepository
	}))
	.decorate("displayColumnService", setupDisplayColumn({
		repository: columnRepository
	}))
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
	.delete(
		"/api/delete-boards",
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
	.put(
		"/api/update-boards",
		({ body: { id , board}, updateService }) => {
		console.log("bateu elysia");
		return updateService({ id, board });
	},
	{
		body: t.Object({
			id: t.String(),
			board: t.Object({
				name: t.String(),
			}),
		}),
	
	})
	.get("/api/boards", ({ fetchService }) => {
		return fetchService({});
	})
	.get("/api/columns", ({displayColumnService}) => {
		return displayColumnService({});
	})
	.listen(3000);
