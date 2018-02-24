export interface Task {
    default_location_id? : number
    runners_required_count : number
    runners_assigned_count : number
    project : boolean
    origin_task_id : number
    origin_task_slug? : any
    clone_task_ids : any[]
    clone_task_slugs : any[]
    id : number
    name : string
    slug : string
    bids_count : number
    price : number
    assigned_price? : number
    comments_count : number
    deadline : Date
    online_or_phone : boolean
    fixed_price : boolean
    state : string
    created_at : Date
    first_posted_at : Date
    posted_or_edited_at : Date
    private_messages_count : number
    sender_id : number
    runner_id? : number
    location_ids : number[]
    sort_present : boolean
    distance? : any
    review_by_runner_id? : number
}

export interface Location {
    id : number
    latitude : string
    longitude : string
    display_name : string
}

export interface AvatarImage {
    url : string
}

export interface Avatar {
    url : string
    source_url : string
    resize_url : string
    tiny : AvatarImage
    small : AvatarImage
    thumb : AvatarImage
    medium : AvatarImage
    profile : AvatarImage
}

export interface Profile {
    average_rating : number
    comments_count : number
    allow_calls_on_tasks : boolean
    default_location_id : number
    id : number
    first_name : string
    avatar : Avatar
    abbreviated_name : string
    slug : string
    pro : boolean
    posted_tasks_count : number
    run_tasks_count : number
    received_reviews_count : number
    ranking_position? : any
    ranking : number
}

export interface Activity {
    created_at : Date
    template : string
    event : string
    task_id : number
    profile_ids : number[]
}

export interface RootObject {
    tasks : Task[]
    locations : Location[]
    profiles : Profile[]
    activity_feed : Activity[]
}
export default RootObject
