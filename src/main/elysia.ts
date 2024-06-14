import { setupCreateBoards } from "domain/features/create-boards";
import Elysia, { t } from "elysia";
import { cors } from "@elysiajs/cors";
import { DrizzleBoardProvider } from "infra/database/providers/drizzle-board-provider";
import { BoardRepository } from "infra/repositories/board-repository";

new Elysia()
	.use(cors())
	.get("/health", () => "it's healthy")
	.decorate(
		"service",
		setupCreateBoards({
			repository: new BoardRepository(new DrizzleBoardProvider()),
		})
	)
	.post(
		"/api/create-boards",
		({ body: { name }, service }) => {
			return service({ name });
		},
		{
			body: t.Object({
				name: t.String(),
			}),
		}
	)
	.listen(3000);
