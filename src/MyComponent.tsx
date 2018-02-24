import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

import ParsedFeed from '~/interfaces/ParsedFeed'
import { MouseOutHandler, MouseOverHandler } from '~/interfaces/EventHandlers'
import ActivityRow from '~/components/ActivityRow'

const styles = {

}

interface State {

}
interface PropsBase {
    items : ParsedFeed
    onMouseOver : MouseOverHandler
    onMouseOut : MouseOutHandler
}
type Props = PropsBase & WithStyles<keyof typeof styles>

export const MyComponent = injectJss(styles)(
    class MyComponent extends React.Component<Props, State> {
        public render() {
            const activities = this.props.items.map((activity, i) => (
                <ActivityRow
                    key={i.toString()}
                    activity={activity}
                    onMouseOut={this.props.onMouseOut}
                    onMouseOver={this.props.onMouseOver}
                />
            ))

            return (
                <div>
                    {activities}
                </div>
            )
        }
    },
)

export default MyComponent
