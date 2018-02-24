import getItemArray from '../getItemArray'

const MAP_COUNT = 10

describe('getItemArray', () => {
    const testMap = new Map<number, string>()
    for (let i = 0; i < MAP_COUNT; i += 1) {
        testMap.set(i, i.toString())
    }

    it('should return empty array for null input', () => {
        // ASSEMBLE
        const ids = null

        // ACT
        const res = getItemArray(testMap, ids)

        // ASSERT
        expect(res).toEqual([])
    })

    it('should skip not found ids', () => {
        // ASSEMBLE
        const ids = [100]

        // ACT
        const res = getItemArray(testMap, ids)

        // ASSERT
        expect(res).toEqual([])
    })

    it('should find existing ids', () => {
        // ASSEMBLE
        const ids = [1, 2, 3]

        // ACT
        const res = getItemArray(testMap, ids)

        // ASSERT
        expect(res).toEqual(['1', '2', '3'])
    })
})
