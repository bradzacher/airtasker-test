import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

const styles = {
    content: {
        textTransform: 'uppercase',
        color: '#879094',
        fontSize: '0.85em',
        fontWeight: 'bold',
        paddingLeft: '3px',
        paddingRight: '3px',
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
