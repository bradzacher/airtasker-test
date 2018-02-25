import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

import { ParsedActivity } from '~/interfaces/ParsedFeed'
import { MouseOutHandler, MouseOverHandler } from '~/interfaces/EventHandlers'
import ProfileElement from '~/components/ProfileElement'
import TaskElement from '~/components/TaskElement'
import FillerElement from '~/components/FillerElement'

const styles = {
    container: {
        paddingTop: '17px',
        paddingBottom: '17px',
        paddingLeft: '7px',
        paddingRight: '7px',
        // the margin brings the border in from the edge as per the examples
        marginLeft: '5px',
        marginRight: '5px',
        borderBottom: '1px solid #F1F1F1',
        lineHeight: '18px',
    },
}

interface PropsBase {
    activity : ParsedActivity
    onMouseOver : MouseOverHandler
    onMouseOut : MouseOutHandler
}
type Props = PropsBase & WithStyles<keyof typeof styles>

export const ActivityRow = injectJss(styles)(
    (props : Props) => {
        // convert the template to a component list
        const content = props.activity.template.map((token, i) => {
            const id = i.toString()

            if (token.kind === 'filler') {
                return (
                    <FillerElement
                        key={id}
                        content={token.content}
                    />
                )
            } else if (token.kind === 'hardlink') {
                if (token.type === 'profiles') {
                    return (
                        <ProfileElement
                            key={id}
                            profile={token.entity}
                            onMouseOut={props.onMouseOut}
                            onMouseOver={props.onMouseOver}
                        />
                    )
                } else if (token.type === 'task') {
                    return (
                        <TaskElement
                            key={id}
                            task={token.entity}
                            onMouseOut={props.onMouseOut}
                            onMouseOver={props.onMouseOver}
                        />
                    )
                }
            }

            // shouldn't happen
            throw new Error('Unexpected token')
        })

        return (
            <div className={props.classes.container}>
                {content}
            </div>
        )
    },
)

export default ActivityRow
