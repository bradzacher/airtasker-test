import React from 'react'
import injectJss, { WithStyles } from 'react-jss'
import feed from '~/activity_feed.json'

import MyComponent from '~/MyComponent'
import MyParser from '~/MyParser'

const styles = {
    '@global': {
        body: {
            fontFamily: 'sans-serif',
            margin: 0,
        },
        '*': {
            boxSizing: 'border-box',
        },
    },
    rolloverPopup: {
        background: 'white',
        paddingTop: '40px',
        paddingBottom: '30px',
        paddingLeft: '4px',
        fontSize: '18px',
    },
    container: {
        boxShadow: '0px 0px 14px 0px #444444',
        display: 'inline-block',
        width: '522px',
        marginLeft: '14px',
        marginTop: '14px',
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
                <div className={this.props.classes.container}>
                    <MyComponent
                        items={ MyParser.getItems(feed) }
                        onMouseOver={ this.handleMouseOver }
                        onMouseOut={ this.handleMouseOut }
                    />
                    <div className={this.props.classes.rolloverPopup}>
                        {this.state.activeItem || 'Mouse over a user or task to get their path.'}
                    </div>
                </div>
            )
        }
    },
)

export default App
