import type { IProfileRepository } from "../../domain/contracts/profile-repository";
import type { Profile } from "../../domain/entities/profile";
import type { IProfileDatabaseProvider } from "../contracts/profile-database-provider";

export class ProfileRepository implements IProfileRepository {
    constructor(private readonly db: IProfileDatabaseProvider) { }
    public async loadAllProfile(): Promise<Profile[]> {
        const data = await this.db.loadAllProfiles()
        return data.map((profile) => ({
            name: profile.name,
            function: profile.function,
            image: profile.image,
            deleted: profile.deleted,
        }));
    }

    public async createProfile(profile: Profile): Promise<Profile> {
        const data = await this.db.createProfile(profile);
        return {
            name: data.name,
            function: data.function,
            image: data.image,
            deleted: data.deleted,
        };
    }
    public async deleteProfile(id: string): Promise<void> {
        const data = await this.db.deleteProfile(id);
    }

    public async renameProfile(profile: Profile, name: string): Promise<void> {

    }
}