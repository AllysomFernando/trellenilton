import Elysia from "elysia";
import { setupCreateUser } from "../../../../sample";

new Elysia()
	.decorate("createUser", setupCreateUser)
	.group("user", (app) =>
		app.post("/login", () => "login").post("/register", () => "register")
	);
