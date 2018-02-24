import { Activity } from '~/interfaces/ActivityFeed'
import { TaskMap, ProfileMap, ParsedProfile, ParsedActivity } from '~/interfaces/ParsedFeed'
import { SoftToken, HardToken } from '~/interfaces/TemplateTokens'

import getItemArray from './lib/getItemArray'
import getItem from './lib/getItem'
import parseTemplate from './ParseTemplate'

export default function (
    activities : Activity[],
    profiles : ProfileMap,
    tasks : TaskMap,
) {
    return activities.map((a) => {
        const {
            task_id: taskId,
            profile_ids: profileIds,
            template,
            created_at: createdAt,
            ...oldActivity
        } = a

        // get the profiles and task
        const activityProfiles = getItemArray(profiles, profileIds)
            .reduce((acc, act) => acc.set(act.id, act), new Map<number, ParsedProfile>())
        const activityTask = getItem(tasks, taskId)

        // parse the template
        let tokens : SoftToken[]
        try {
            tokens = parseTemplate(template)
        } catch (e) {
            console.error(e)

            return null
        }

        const newActivity = {
            ...oldActivity,
            created_at: new Date(createdAt),

            template: tokens.map((tok) => {
                if (tok.kind === 'filler') {
                    return tok
                }

                if (tok.kind === 'softlink') {
                    if (tok.type === 'profiles') {
                        const entity = activityProfiles.get(tok.id)
                        if (!entity) {
                            console.error(`Malformed activity - missing activity #${tok.id}`)

                            return null
                        }

                        return {
                            kind: 'hardlink',
                            type: 'profiles',
                            entity,
                        }
                    }
                    if (tok.type === 'task') {
                        if (tok.id !== taskId) {
                            console.error(`Malformed activity - incorrect task id #${taskId}`)
                        }

                        return {
                            kind: 'hardlink',
                            type: 'task',
                            entity: activityTask,
                        }
                    }
                }

                // shouldn't ever happen
                return null
            }).filter(t => !!t) as HardToken[],
        }

        return newActivity
    })
    // clean out activities with malformed templates
    .filter(a => !!a) as ParsedActivity[]
}
