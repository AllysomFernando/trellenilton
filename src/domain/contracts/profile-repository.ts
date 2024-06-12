import type { Profile } from "../entities/profile";

export interface IProfileRepository {
    createProfile: (profile: Profile) => Promise<Profile>
    loadAllProfile: () => Promise<Profile[]>
    deleteProfile: (profile: Profile, id: string) => Promise<void>
    renameProfile: (profile: Profile, name: string) => Promise<void>
}