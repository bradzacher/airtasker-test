/* eslint-disable camelcase */
import {
    ProfileBase,
    TaskBase,
    ActivityBase,
    LocationBase,
} from './ActivityFeed'
import { HardToken } from './TemplateTokens'


export interface ParsedLocation extends LocationBase {}
export type LocationMap = Map<ParsedLocation['id'], ParsedLocation>


export interface ParsedProfile extends ProfileBase {
    default_location : ParsedLocation | null
}
export type ProfileMap = Map<ParsedProfile['id'], ParsedProfile>


export interface ParsedTask extends TaskBase {
    clone_tasks : ParsedTask[] | null
    created_at : Date
    deadline : Date
    default_location : ParsedLocation | null
    first_posted_at : Date
    locations : ParsedLocation[]
    posted_or_edited_at : Date
    origin_task : ParsedTask | null
    review_by_runner : ParsedProfile | null
    runner : ParsedProfile | null
    sender : ParsedProfile
}
export type TaskMap = Map<ParsedTask['id'], ParsedTask>


export interface ParsedActivity extends ActivityBase {
    created_at : Date
    template : HardToken[]
}
export type ParsedFeed = ParsedActivity[]
export default ParsedFeed
