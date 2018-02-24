import getItem from '../getItem'

const MAP_COUNT = 10

describe('getItem', () => {
    const testMap = new Map<number, string>()
    for (let i = 0; i < MAP_COUNT; i += 1) {
        testMap.set(i, i.toString())
    }

    it('should return null for a null id', () => {
        // ASSEMBLE
        const id = null

        // ACT
        const res = getItem(testMap, id)

        // ASSERT
        expect(res).toBeNull()
    })
    it('should return null for an undefined id', () => {
        // ASSEMBLE
        const id = undefined

        // ACT
        const res = getItem(testMap, id)

        // ASSERT
        expect(res).toBeNull()
    })
    it('should return null for a not found id', () => {
        // ASSEMBLE
        const id = 100

        // ACT
        const res = getItem(testMap, id)

        // ASSERT
        expect(res).toBeNull()
    })
    it('should return a found id', () => {
        // ASSEMBLE
        for (let id = 0; id < MAP_COUNT; id +=1) {
            // ACT
            const res = getItem(testMap, id)

            // ASSERT
            expect(res).toBe(id.toString())
        }
    })
})
