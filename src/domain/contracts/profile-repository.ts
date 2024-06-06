import type { Profile } from "../entities/profile";

export interface IProfileRepository {
    createProfile: (profile: Profile) => Promise<Profile>
    loadAllProfile: () => Promise<Profile[]>
}