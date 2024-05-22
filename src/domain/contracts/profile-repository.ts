import type { Profile } from "../entities/profile";

export interface ICreateProfileRepository {
    createProfile: (profile: Profile) => Promise<Profile>
}