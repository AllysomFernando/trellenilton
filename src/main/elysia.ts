import { setupCreateBoards } from "domain/features/create-boards";
import Elysia, { t } from "elysia";
import { cors } from "@elysiajs/cors";
import { DrizzleBoardProvider } from "infra/database/providers/drizzle-board-provider";
import { BoardRepository } from "infra/repositories/board-repository";
import { setupDisplayBoards } from "domain/features/display-boards";
import { setupDeleteBoard } from "domain/features/delete-board";

const boardRepository = new BoardRepository(new DrizzleBoardProvider());

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
	.post(
		"/api/create-boards",
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
		"api/delete-boards/:id",
		({ body: { id, board }, deleteService }) => {
			return deleteService({ id, board });
		},
		{
			body: t.Object({
				id: t.String(),
				board: t.Object({
					deleted: t.Boolean(),
					id: t.String(),
					name: t.String(),
					createdAt: t.String(),
				}),
			}),
		}
	)

	.get("/api/boards", ({ fetchService }) => {
		return fetchService({});
	})

	.listen(3000);
