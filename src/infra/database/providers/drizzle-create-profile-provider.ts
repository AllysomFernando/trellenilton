import { db } from "../../../main/drizzle";
import type { ICreateProfileDatabaseProvider } from "../../contracts/profile-database-provider";

export class DrizzleCreateProfilveProvider implements ICreateProfileDatabaseProvider {
    public async createProfile(profile: any): Promise<any> {
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
