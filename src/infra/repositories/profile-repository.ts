import type { IProfileRepository } from "../../domain/contracts/profile-repository";
import type { Profile } from "../../domain/entities/profile";
import type { IProfileDatabaseProvider } from "../contracts/profile-database-provider";

export class ProfileRepository implements IProfileRepository {
    constructor(private readonly db: IProfileDatabaseProvider) { }
    public async loadAllProfile(): Promise<Profile[]> {
        const data = await this.db.loadAllProfiles()
        return data.map((profile) => ({
            id: profile.id,
            name: profile.name,
            funcao: profile.funcao,
            deleted: profile.deleted,
        }));
    }

    public async createProfile(profile: Profile): Promise<Profile> {
        const data = await this.db.createProfile(profile);
        return {
            id: data.id,
            name: data.name,
            funcao: data.funcao,
            deleted: data.deleted,
        };
    }
    public async deleteProfile(id: string): Promise<void> {
        await this.db.deleteProfile(id);
    }

    public async renameProfile(profile: any, id: string): Promise<Profile> {
        const data = await this.db.renameProfile(profile, id)
        return{
            id: data.id,
            name: data.name,
            funcao: data.funcao,
            deleted: data.deleted,
        }
    }
}