import { describe, test, expect } from 'bun:test'

type Profile = {
    name: string,
    deletado: number,
}

type DeleteProfile = (dto: Profile) => Pick<Profile, "deletado">
const deleteProfile: DeleteProfile = (dto) => {
    if (dto.deletado == 0) {
        dto.deletado = 1
    } else {
        throw new Error("Profile already deleted")
    }
    return {
        deletado: dto.deletado
    }
}

describe("DeleteProfile", () => {
    test("should return status dto deleted", () => {
        const goodInput = {
            name: "Diego",
            deletado: 0
        }
        const response = deleteProfile(goodInput)
        expect(response).toEqual({
            deletado: 1
        })
    })

    test("should return error message", () => {
        const badInput = {
            name: "Diego",
            deletado: 1
        }
        try {
            deleteProfile(badInput)
        } catch (error) {
            expect(error).toEqual("Profile already deleted")
        }
    })

})