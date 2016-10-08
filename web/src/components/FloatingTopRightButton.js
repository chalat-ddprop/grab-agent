import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const POSITION_MARGIN = 70;
const style = {
    margin: 0,
    top: 20, // 80
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
};

class FloatingTopRightButton extends Component {
  render() {
    let position = this.props.position || 1,
        buttonStyle = Object.assign({}, style, { top: style.top + (POSITION_MARGIN * (position - 1)) }),
        props = Object.assign({}, this.props);

    delete props.position;

    return (
      <FloatingActionButton {...props} style={ buttonStyle }>
        {this.props.children}
      </FloatingActionButton>
    );
  }
}

export default FloatingTopRightButton;
