import type { Profile } from "../entities/profile";

export interface IProfileRepository {
    createProfile: (name: string, deleted: boolean, funcao: string) => Promise<Profile>
    loadAllProfile: () => Promise<Profile[]>
    deleteProfile: (id: string) => Promise<void>
    renameProfile: (profile: Profile, id: string) => Promise<Profile>
}