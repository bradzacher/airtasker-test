import { Location, Profile, Task, Activity } from '~/interfaces/ActivityFeed'
import { ParsedProfile, ParsedLocation, ParsedTask } from '~/interfaces/ParsedFeed'

// LOCATION
export const locations : Location[] = [
    {
        id: 1,
        display_name: 'one',
        latitude: '0',
        longitude: '0',
    },
    {
        id: 2,
        display_name: 'two',
        latitude: '0',
        longitude: '0',
    },
    {
        id: 3,
        display_name: 'three',
        latitude: '0',
        longitude: '0',
    },
]
export const locationMap = new Map<number, ParsedLocation>()
locations.forEach(l => locationMap.set(l.id, l))

// PROFILE
function seedBaseProfile(id : number) {
    return {
        abbreviated_name: `abbr_name${id}`,
        allow_calls_on_tasks: false,
        avatar: {
            medium: {
                url: `url_medium${id}`,
            },
            profile: {
                url: `url_profile${id}`,
            },
            resize_url: `resize_url${id}`,
            small: {
                url: `url_small${id}`,
            },
            source_url: `source_url${id}`,
            thumb: {
                url: `url_thumb${id}`,
            },
            tiny: {
                url: `url_tiny${id}`,
            },
            url: `url${id}`,
        },
        average_rating: id,
        comments_count: id,
        first_name: `first_name${id}`,
        id,
        posted_tasks_count: id,
        pro: false,
        ranking: id,
        ranking_position: null,
        received_reviews_count: id,
        run_tasks_count: id,
        slug: `slug${id}`,
    }
}
function seedProfile(id : number) : Profile {
    return {
        ...seedBaseProfile(id),
        default_location_id: id,
    }
}
function seedParsedProfile(id : number) : ParsedProfile {
    return {
        ...seedBaseProfile(id),
        default_location: locations[id - 1],
    }
}

export const profiles = [
    seedProfile(1),
    seedProfile(2),
    seedProfile(3),
]
export const profileMap = new Map<number, ParsedProfile>()
for (let i = 1; i <= 3; i += 1) {
    profileMap.set(i, seedParsedProfile(i))
}

// TASK
function seedBaseTask(id : number) {
    return {
        assigned_price: id,
        bids_count: id,
        clone_task_slugs: [],
        comments_count: id,
        distance: null,
        fixed_price: false,
        id,
        name: `name${id}`,
        online_or_phone: false,
        origin_task_slug: null,
        price: id,
        private_messages_count: id,
        project: false,
        runners_required_count: id,
        runners_assigned_count: id,
        slug: `slug${id}`,
        sort_present: false,
        state: `state${id}`,
    }
}
function seedTask(id : number) : Task {
    return {
        ...seedBaseTask(id),
        clone_task_ids: [id],
        created_at: new Date().toISOString(),
        deadline: new Date().toISOString(),
        default_location_id: id,
        first_posted_at: new Date().toISOString(),
        location_ids: [id],
        origin_task_id: id,
        posted_or_edited_at: new Date().toISOString(),
        review_by_runner_id: id,
        runner_id: id,
        sender_id: id,
    }
}
function seedParsedTask(id : number) : ParsedTask {
    return {
        ...seedBaseTask(id),
        clone_tasks: null,
        created_at: new Date(),
        deadline: new Date(),
        default_location: locations[id - 1],
        first_posted_at: new Date(),
        locations: [locations[id - 1]],
        posted_or_edited_at: new Date(),
        origin_task: null,
        review_by_runner: profileMap.get(id - 1)!,
        runner: profileMap.get(id - 1)!,
        sender: profileMap.get(id - 1)!,
    }
}
export const tasks = [
    seedTask(1),
    seedTask(2),
    seedTask(3),
]
export const taskMap = new Map<number, ParsedTask>()
for (let i = 1; i <= 3; i += 1) {
    taskMap.set(i, seedParsedTask(i))
}

// ACTIVITY
export const activities : Activity[] = [
    {
        created_at: new Date().toISOString(),
        template: '{ profiles:1 } bid on { task:1 }',
        event: 'event1',
        task_id: 1,
        profile_ids: [1],
    },
    {
        created_at: new Date().toISOString(),
        template: '{ profiles:2 } bid on { task:2 }',
        event: 'event2',
        task_id: 2,
        profile_ids: [2],
    },
    {
        created_at: new Date().toISOString(),
        template: '{ profiles:3 } bid on { task:3 }',
        event: 'event3',
        task_id: 3,
        profile_ids: [3],
    },
]
