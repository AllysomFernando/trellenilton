import { describe, test, expect } from 'bun:test'

type Profile = {
    name: string,
    function: string,
}
type CreateProfile = (dto: Profile) => Pick<Profile, "name">
const createProfile: CreateProfile = (dto) => {
    if (dto.name.length < 3) {
        throw new Error("Name must be at least 3 characters")

    }
    return {
        name: dto.name,
    }
}

describe('create-profile', () => {
    test('should create a profile', async () => {
        const goodInput = {
            name: "Diego",
            function: "Admininastor"
        }
        const response = createProfile(goodInput)
        expect(response).toEqual({
            name: "Diego"
        })
    })

    test("Should thrown an error when creating a profile with less than 3 characters", () => {
        const badInput = {
            name: "D",
            function: "Admininastor",
        }
        try {
            createProfile(badInput)
        } catch (error) {
            expect(error).toEqual(new Error("Name must be at least 3 characters"))
        }
    }
    )
})