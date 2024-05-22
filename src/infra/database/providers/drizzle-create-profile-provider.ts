import { db } from "../../../main/drizzle";
import type { ICreateProfileDatabaseProvider } from "../../contracts/create-profile-database-profile";

export class DrizzleCreateProfilveProvider implements ICreateProfileDatabaseProvider {
    public async insertProfileDatabase(): => Promise<any>{
        const result = await db.query.profile'.create({
            data: {
                name: "Diego"
            }
        })
    };
}