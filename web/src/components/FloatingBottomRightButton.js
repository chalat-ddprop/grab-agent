import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

class FloatingBottomRightButton extends Component {
  render() {
    return (
      <FloatingActionButton {...this.props} style={style}>
        {this.props.children}
      </FloatingActionButton>
    );
  }
}

export default FloatingBottomRightButton;
