import { Location, Avatar } from './ActivityFeed'

export type ParsedLocation = Location
export type LocationMap = Map<ParsedLocation['id'], ParsedLocation>

export interface ParsedProfile {
    abbreviated_name : string
    allow_calls_on_tasks : boolean
    avatar : Avatar
    average_rating : number
    comments_count : number
    default_location : Location
    first_name : string
    id : number
    pro : boolean
    posted_tasks_count : number
    ranking : number
    ranking_position? : any
    received_reviews_count : number
    run_tasks_count : number
    slug : string
}
export type ProfileMap = Map<ParsedProfile['id'], ParsedProfile>

export interface ParsedFeed {

}
export default ParsedFeed
