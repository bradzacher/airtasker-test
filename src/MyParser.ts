import ActivityFeed from '~/interfaces/ActivityFeed'
import ParsedFeed from '~/interfaces/ParsedFeed'

import * as Parser from '~/parser'

const MyParser = {
    getItems: (data : ActivityFeed) : ParsedFeed => {
        // parse locations first as they are the only independent data
        const locations = Parser.ParseLocations(data.locations)

        // next profiles, as they only depend on locations
        const profiles = Parser.ParseProfiles(data.profiles, locations)

        // tasks depend on profiles + locations
        const tasks = Parser.ParseTasks(data.tasks, locations, profiles)

        // finally parse the feed
        const activities = Parser.ParseActivities(
            data.activity_feed,
            profiles,
            tasks,
        )

        return activities
    },
}

export default MyParser
