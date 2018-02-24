import ParseProfiles from '../ParseProfiles'
import { locationMap, profiles } from './fixtures'
import { denormalizeCheck } from './util'

describe('ParseProfiles', () => {
    // ACT
    const res = ParseProfiles(profiles, locationMap)

    it('should map the profiles by id', () => {
        expect(res).toBeInstanceOf(Map)
        expect(res.size).toBe(profiles.length)
        profiles.forEach(p => expect(res.has(p.id)).toBeTruthy())
    })

    denormalizeCheck(
        res,
        'default_location',
    )
})
