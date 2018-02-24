/* eslint-disable camelcase */

export interface TaskBase {
    assigned_price : number | null
    bids_count : number
    clone_task_slugs : any[] // null in sample data
    comments_count : number
    distance : any // null in sample data
    fixed_price : boolean
    id : number
    name : string
    online_or_phone : boolean
    origin_task_slug : any // null in sample data
    price : number
    private_messages_count : number
    project : boolean
    runners_required_count : number
    runners_assigned_count : number
    slug : string
    sort_present : boolean
    state : string
}
export interface Task extends TaskBase {
    clone_task_ids : number[] | null
    created_at : string
    deadline : string
    default_location_id : number | null
    first_posted_at : string
    location_ids : number[]
    origin_task_id : number
    posted_or_edited_at : string
    review_by_runner_id : number | null
    runner_id : number | null
    sender_id : number
}

export interface LocationBase {
    id : number
    display_name : string
    latitude : string
    longitude : string
}
export interface Location extends LocationBase {}

export interface AvatarImage {
    url : string
}

export interface Avatar {
    medium : AvatarImage
    profile : AvatarImage
    resize_url : string
    small : AvatarImage
    source_url : string
    thumb : AvatarImage
    tiny : AvatarImage
    url : string
}

export interface ProfileBase {
    abbreviated_name : string
    allow_calls_on_tasks : boolean
    avatar : Avatar
    average_rating : number
    comments_count : number
    first_name : string
    id : number
    posted_tasks_count : number
    pro : boolean
    ranking : number
    ranking_position : any // null in sample data
    received_reviews_count : number
    run_tasks_count : number
    slug : string
}
export interface Profile extends ProfileBase {
    default_location_id : number
}

export interface ActivityBase {
    event : string
}
export interface Activity extends ActivityBase {
    created_at : string
    profile_ids : number[]
    task_id ?: number
    template : string
}

export interface RootObject {
    activity_feed : Activity[]
    locations : Location[]
    profiles : Profile[]
    tasks : Task[]
}
export default RootObject
