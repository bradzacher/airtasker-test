import ParseActivities from '../ParseActivities'
import { profileMap, taskMap, activities } from './fixtures'
import { dateCheck } from './util'

describe('ParseActivities', () => {
    // ACT
    const res = ParseActivities(activities, profileMap, taskMap)

    it('should return an array with all the activities', () => {
        // ASSERT
        expect(Array.isArray(res)).toBeTruthy()
        expect(res.length).toBe(activities.length)
        activities.forEach((a, i) => expect(a.event).toEqual(res[i].event))
    })

    dateCheck(
        res,
        'created_at',
    )

    it('should convert the template to hard links', () => {
        // ASSERT
        res.forEach((a) => {
            a.template.forEach((t) => {
                expect(t.kind === 'hardlink'
                    || t.kind === 'filler').toBeTruthy()

                if (t.kind === 'hardlink') {
                    expect(t.entity).toBeDefined()
                    expect(t.entity).not.toBeNull()
                }
            })
        })
    })
})
