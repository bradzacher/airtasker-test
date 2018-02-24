import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

import { ParsedTask } from '~/interfaces/ParsedFeed'
import { MouseOutHandler, MouseOverHandler } from '~/interfaces/EventHandlers'

import LinkElement from './LinkElement'

const styles = {

}

interface PropsBase {
    task : ParsedTask
    onMouseOver : MouseOverHandler
    onMouseOut : MouseOutHandler
}
type Props = PropsBase & WithStyles<keyof typeof styles>

export const TaskElement = injectJss(styles)(
    ({ task, onMouseOver, onMouseOut } : Props) => {
        const content = task.name
        const slug = task.slug

        return (
            <LinkElement
                content={content}
                slug={`/task/${slug}`}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />
        )
    },
)

export default TaskElement
