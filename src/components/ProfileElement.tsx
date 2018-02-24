import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

import { ParsedProfile } from '~/interfaces/ParsedFeed'
import { MouseOutHandler, MouseOverHandler } from '~/interfaces/EventHandlers'

import LinkElement from './LinkElement'

const styles = {

}

interface PropsBase {
    profile : ParsedProfile
    onMouseOver : MouseOverHandler
    onMouseOut : MouseOutHandler
}
type Props = PropsBase & WithStyles<keyof typeof styles>

export const ProfileElement = injectJss(styles)(
    ({ profile, onMouseOut, onMouseOver } : Props) => {
        const content = profile.abbreviated_name
        const slug = profile.slug

        return (
            <LinkElement
                content={content}
                slug={`/users/${slug}`}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />
        )
    },
)

export default ProfileElement
