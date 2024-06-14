import type { IProfileRepository } from "../contracts/profile-repository";
import type { Profile } from "../entities/profile";

type Input = {
    id: string,
    name: string,
    funcao?: string,
    deleted?: boolean,
}
type Output = Profile

type RenameProfile = (input: Input) => Promise<Output>

type SetupRenameProfileProps = {
    repository: IProfileRepository
}
type Setup = (props: SetupRenameProfileProps) => RenameProfile

export const setupRenameProfile: Setup = ({ repository }) => async ({ id, name, funcao, deleted }) => {
    try {
        const profiles = await repository.loadAllProfile();
        const profile = profiles.find(profile => profile.id === id);
        if (!profile) {
            throw new Error(`Profile with the id ${id} not found`, {
                cause: "profile-not-found"
            });
        }
        if (name && name.length < 3) {
            throw new Error("Name must have at least 3 characters long", {
                cause: "invalid-profile-name"
            });
        }
        const renameProfile: Profile = {
            ...profile,
            name: name ?? profile.name,
            deleted: deleted ?? profile.deleted
        }

        return await repository.renameProfile(renameProfile, id);
    } catch (error) {
        throw new Error("Could not rename profile", {
            cause: "rename-profile"
        });
    }
}