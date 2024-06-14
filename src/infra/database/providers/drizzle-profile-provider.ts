import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import type { IProfileDatabaseProvider } from "../../contracts/profile-database-provider";
import { profile } from "../models";

export class DrizzleProfileProvider implements IProfileDatabaseProvider {
    public async loadAllProfiles(): Promise<any[]> {
        const result = await db.query.profile.findMany({
            with: {
                deleted: 0
            }
        });
        return result;
    }
    public async createProfile(name: string): Promise<any> {
        const result = await db.insert(profile).values({
            name: name,
            funcao: String,
            deleted: false,
        }
        );
        return result;
    }
    public async deleteProfile(id: string): Promise<void> {
        await db
            .update(profile)
            .set({ deleted: false })
            .where(eq(profile.id, id))
            .execute();
    }
    public async renameProfile(profile: any, id: string): Promise<any> {
        await db
            .update(profile)
            .set({
                name: profile.name,
            })
            .where(eq(profile.id, id))
            .execute()
    }
};
