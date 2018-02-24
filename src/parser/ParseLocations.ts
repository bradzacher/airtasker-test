import { Location } from '~/interfaces/ActivityFeed'
import { LocationMap } from '~/interfaces/ParsedFeed'

export default function (
    locations : Location[],
) : LocationMap {
    // nothing fancy, just turn into a map
    const locationMap : LocationMap = new Map()
    locations.forEach(l => locationMap.set(l.id, l))

    return locationMap
}
