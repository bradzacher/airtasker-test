import React from 'react';
import {render} from 'react-dom';
import feed from './activity_feed.json';

import MyComponent from './MyComponent.jsx';
import MyParser from './MyParser.js';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: null
    }
  }

  handleMouseOver (arg) {
    this.setState({activeItem: arg})
  }

  handleMouseOut () {
    this.setState({activeItem: null})
  }

  render () {
    return (
      <div>
        <MyComponent
          items={ MyParser.getItems(feed) }
          onMouseOver={ this.handleMouseOver.bind(this) }
          onMouseOut={ this.handleMouseOut.bind(this) }
          />
        <div id='rollover-popup'>{this.state.activeItem || `Mouse over a user or task to get their path.`}</div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));