import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import type { ICreateProfileDatabaseProvider } from "../../contracts/profile-database-provider";

export class DrizzleProfileProvider implements ICreateProfileDatabaseProvider {
    public async loadAllProfiles(): Promise<any[]> {
        const result = await db.query.profile.findMany({
            with:{
                deleted: 0
            }
        });
        return result;
    }
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
   public async deleteProfile (profile: any, id: string) : Promise<any>{
    const result = await db
     .update(profile)
     .set({ deleted: "1" })
     .where(eq(profile.id, id))
     .execute();
    return result;
   }
};
