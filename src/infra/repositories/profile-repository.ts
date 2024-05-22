import type { ICreateProfileRepository } from "../../domain/contracts/profile-repository";
import type { Profile } from "../../domain/entities/profile";
import type { ICreateProfileDatabaseProvider } from "../contracts/create-profile-database-profile";

export class ProfileRepository implements ICreateProfileRepository {
    constructor(private readonly db: ICreateProfileDatabaseProvider) { }

    public async createProfile(profile: Profile): Promise<Profile> {
        const data = await this.db.createProfile(profile);
        return {
            name: data.name,
            function: data.function,
            image: data.image,
            deleted: data.deleted,
        };
    }
}