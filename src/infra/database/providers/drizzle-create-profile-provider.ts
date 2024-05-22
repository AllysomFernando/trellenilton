import type { Profile } from "../../../domain/entities/profile";
import { db } from "../../../main/drizzle";
import type { ICreateProfileDatabaseProvider } from "../../contracts/create-profile-database-profile";

export class DrizzleCreateProfilveProvider implements ICreateProfileDatabaseProvider {
    public async insertProfileDatabase(profile: Profile): Promise<any>{
        const result = await db.insert(profile).values(
            {
                name: String,
                function: String,
                image: String,
                deleted: Number,
            }
        );
        return result;
    }
};
