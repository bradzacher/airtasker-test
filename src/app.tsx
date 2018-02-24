import React from 'react'
import feed from '~/activity_feed.json'

import MyComponent from '~/MyComponent'
import MyParser from '~/MyParser'

interface State {
    activeItem : any // TODO - type
}
interface Props {

}

export class App extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)

        this.state = {
            activeItem: null
        }
    }

    handleMouseOver = (arg : any) => {
        this.setState(() => ({
            activeItem: arg,
        }))
    }

    handleMouseOut = () => {
        this.setState(() => ({
            activeItem: null,
        }))
    }

    render() {
        return (
            <div>
                <MyComponent
                    items={ MyParser.getItems(feed) }
                    onMouseOver={ this.handleMouseOver }
                    onMouseOut={ this.handleMouseOut }
                />
                <div id='rollover-popup'>{this.state.activeItem || `Mouse over a user or task to get their path.`}</div>
            </div>
        )
    }
}

export default App
