import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

const styles = {
    content: {
        textTransform: 'uppercase',
        color: '#CACACA',
    },
}

interface PropsBase {
    content : string
}
type Props = PropsBase & WithStyles<keyof typeof styles>

export const FillerElement = injectJss(styles)(
    ({ content, classes } : Props) => (
        <span className={classes.content}>
            {content}
        </span>
    ),
)

export default FillerElement
