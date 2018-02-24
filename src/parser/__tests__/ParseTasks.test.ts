import ParseTasks from '../ParseTasks'
import { locationMap, profileMap, tasks } from './fixtures'
import { denormalizeCheck, dateCheck } from './util'

describe('ParseLocations', () => {
    // ACT
    const res = ParseTasks(tasks, locationMap, profileMap)

    it('should map the tasks by id', () => {
        expect(res).toBeInstanceOf(Map)
        expect(res.size).toBe(tasks.length)
        tasks.forEach(t => expect(res.has(t.id)).toBeTruthy())
    })

    denormalizeCheck(
        res,
        'default_location',
    )
    denormalizeCheck(
        res,
        'locations',
        item => item.locations[0].id,
        'location_ids',
    )
    denormalizeCheck(
        res,
        'review_by_runner',
    )
    denormalizeCheck(
        res,
        'sender',
    )
    denormalizeCheck(
        res,
        'review_by_runner',
    )

    dateCheck(
        res,
        'created_at',
    )
    dateCheck(
        res,
        'deadline',
    )
    dateCheck(
        res,
        'first_posted_at',
    )
    dateCheck(
        res,
        'posted_or_edited_at',
    )
})
