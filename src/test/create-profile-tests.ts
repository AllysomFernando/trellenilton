import { describe, test, expect } from 'bun:test'



import { setupCreateProfile } from './create-profile'

describe('create-profile', () => {
    test('should create a profile', async () => {
        const goodInput = {
            name: "Diego",
            function: "Admininastor",
            image: "1",
            deleted: 0
        }
        const response = await setupCreateProfile(goodInput)
        expect(response).toEqual({
            name: "Diego"
        })
    })

    test("Should thrown an error when creating a profile with less than 3 characters", () => {
        const badInput ={
            name: "D",
            function: "Admininastor",
        }
    } 
    )
})