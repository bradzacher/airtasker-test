import ParseLocations from '../ParseLocations'
import { locations } from './fixtures'

describe('ParseLocations', () => {
    it('should map the locations by ID', () => {
        // ACT
        const res = ParseLocations(locations)

        // ASSERT
        expect(res).toBeInstanceOf(Map)
        expect(res.size).toBe(locations.length)
        locations.forEach(l => expect(res.has(l.id)).toBeTruthy())
    })
})
