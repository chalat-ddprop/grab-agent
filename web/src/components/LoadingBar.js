import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  position: 'fixed',
  zIndex: 3,
}

class LoadingBar extends Component {
  render() {
    if (this.props.display === false) {
      return null;
    }

    return (
      <LinearProgress style={ style } />
    )
  }
}

export default LoadingBar
