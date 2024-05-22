import type { Profile } from "../entities/profile";

export interface ICreateProfileRepository {
    insertProfile: (profile: Profile) => Promise<Profile>
}