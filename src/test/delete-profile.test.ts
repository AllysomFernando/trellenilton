import { describe, test, expect } from 'bun:test'

type Profile = {
    name: string,
    deleted: number
}

type DeleteProfile = (dto: Profile) => Pick<Profile, "deleted">
const deleteProfile: DeleteProfile = (dto) => {
    if (dto.deleted === 0) {
        dto.deleted = 1
    }
    return "Profile deleted"
}

describe("DeleteProfile", () => {
    test("should return message", () => {
        const goodInput = {
            name: "Diego",
            deleted: 0
        }
    })

})