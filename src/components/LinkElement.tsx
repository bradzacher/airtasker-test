import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

import { MouseOutHandler, MouseOverHandler } from '~/interfaces/EventHandlers'

const styles = {
    anchor: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#028FB6',
        paddingBottom: '2px',
        '&:hover': {
            borderBottom: '1px solid #028FB6',
        },
    },
}

interface PropsBase {
    content : string
    slug : string
    onMouseOver : MouseOverHandler
    onMouseOut : MouseOutHandler
}
type Props = PropsBase & WithStyles<keyof typeof styles>

export const LinkElement = injectJss(styles)(
    class LinkElement extends React.Component<Props> {
        private onMouseOver = () => {
            this.props.onMouseOver(this.props.slug)
        }
        private onMouseOut = () => {
            this.props.onMouseOut()
        }

        public render() {
            return (
                <a
                    className={this.props.classes.anchor}
                    href={this.props.slug}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                >
                    {this.props.content}
                </a>
            )
        }
    },
)

export default LinkElement
