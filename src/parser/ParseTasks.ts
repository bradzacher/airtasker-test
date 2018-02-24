import { Task } from '~/interfaces/ActivityFeed'
import { LocationMap, ProfileMap, TaskMap } from '~/interfaces/ParsedFeed'

import getItem from './lib/getItem'
import getItemArray from './lib/getItemArray'

export default function (
    tasks : Task[],
    locations : LocationMap,
    profiles : ProfileMap,
) : TaskMap {
    const taskMap : TaskMap = new Map()

    tasks.forEach((t) => {
        const {
            default_location_id: defaultLocationId,
            location_ids: locationIds,
            review_by_runner_id: reviewByRunnerId,
            runner_id: runnerId,
            sender_id: senderId,
            created_at: createdAt,
            deadline,
            first_posted_at: firstPostedAt,
            posted_or_edited_at: postedOrEditedAt,
            ...oldTask
        } = t

        const sender = profiles.get(senderId)
        if (!sender) {
            // skip profiles without a sender
            return
        }

        const newTask = {
            ...oldTask,

            // parse the dates
            created_at: new Date(createdAt),
            deadline: new Date(deadline),
            first_posted_at: new Date(firstPostedAt),
            posted_or_edited_at: new Date(postedOrEditedAt),

            // denormalise the locations
            default_location: getItem(locations, defaultLocationId),
            locations: getItemArray(locations, locationIds),

            // denormalise the profiles
            review_by_runner: getItem(profiles, reviewByRunnerId),
            runner: getItem(profiles, runnerId),
            sender,

            // we'll fill these in on our second pass
            clone_tasks: null,
            origin_task: null,
        }

        taskMap.set(t.id, newTask)
    })

    // map the task fields
    tasks.forEach((t) => {
        const newTask = taskMap.get(t.id)

        if (!newTask) {
            return
        }

        newTask.clone_tasks = getItemArray(taskMap, t.clone_task_ids)
        newTask.origin_task = getItem(taskMap, t.origin_task_id)
    })

    return taskMap
}
