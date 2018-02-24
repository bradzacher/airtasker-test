import React from 'react'
import injectJss, { WithStyles } from 'react-jss'
import feed from '~/activity_feed.json'

import MyComponent from '~/MyComponent'
import MyParser from '~/MyParser'

const styles = {
    '@global': {
        body: {
            fontFamily: 'sans-serif',
        },
        '#rollover-popup': {
            background: 'white',
            bottom: '30px',
            position: 'fixed',
        },
    },
}

interface State {
    activeItem : string | null
}
interface PropsBase {

}
type Props = PropsBase & WithStyles<keyof typeof styles>

const App = injectJss(styles)(
    class App extends React.Component<Props, State> {
        public constructor(props : Props) {
            super(props)

            this.state = {
                activeItem: null,
            }
        }

        private handleMouseOver = (arg : string) => {
            this.setState(() => ({
                activeItem: arg,
            }))
        }

        private handleMouseOut = () => {
            this.setState(() => ({
                activeItem: null,
            }))
        }

        public render() {
            return (
                <div>
                    <MyComponent
                        items={ MyParser.getItems(feed) }
                        onMouseOver={ this.handleMouseOver }
                        onMouseOut={ this.handleMouseOut }
                    />
                    <div id='rollover-popup'>
                        {this.state.activeItem || 'Mouse over a user or task to get their path.'}
                    </div>
                </div>
            )
        }
    },
)

export default App
