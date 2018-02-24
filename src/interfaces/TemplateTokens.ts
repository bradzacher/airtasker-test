import { ParsedProfile, ParsedTask } from './ParsedFeed'

export interface FillerToken {
    kind : 'filler'
    content : string
}

export interface IncompleteLinkToken {
    kind : 'incompletelink'
    content : string
}
export interface SoftLinkToken {
    kind : 'softlink'
    type : 'profiles' | 'task'
    id : number
}
export interface HardLinkProfilesToken {
    kind : 'hardlink'
    type : 'profiles'
    entity : ParsedProfile
}
export interface HardLinkTaskToken {
    kind : 'hardlink'
    type : 'task'
    entity : ParsedTask
}

export type ParsingToken = FillerToken | SoftLinkToken | IncompleteLinkToken
export type SoftToken = FillerToken | SoftLinkToken
export type HardToken = FillerToken | HardLinkProfilesToken | HardLinkTaskToken
