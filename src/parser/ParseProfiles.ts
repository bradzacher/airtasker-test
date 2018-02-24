import { Profile } from '~/interfaces/ActivityFeed'
import { LocationMap, ProfileMap } from '~/interfaces/ParsedFeed'

export default function (
    profiles : Profile[],
    locations : LocationMap,
) : ProfileMap {
    const profileMap : ProfileMap = new Map()

    profiles.forEach((p) => {
        const {
            default_location_id: defaultLocationId,
            ...oldProfile
        } = p

        // denormalise the location
        const defaultLocation = locations.get(defaultLocationId) || null

        const newProfile = {
            ...oldProfile,
            default_location: defaultLocation,
        }

        profileMap.set(p.id, newProfile)
    })

    return profileMap
}
