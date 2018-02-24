import React from 'react'
import injectJss, { WithStyles } from 'react-jss'

import ParsedFeed from '~/interfaces/ParsedFeed'

const styles = {
    foo: { },
}

type MouseOverHandler = (item : string) => void
type MouseOutHandler = () => void

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
            return <div>Your solution here</div>
        }
    },
)

export default MyComponent
