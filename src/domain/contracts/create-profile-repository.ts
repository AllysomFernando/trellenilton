import type { Profile } from "../entities/profile";

export interface ICreateProfileRepository {
    insertProfile: () => Promise<Profile>
}