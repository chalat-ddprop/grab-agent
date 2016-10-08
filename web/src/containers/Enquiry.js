import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import SearchProperty from './SearchProperty';
import Location from './Location';

class Enquiry extends Component {
  render() {
    if (this.props.state === 'map') {
      return (
        <Location/>
      )
    }
    return (
      <div>
        <AppBar
          title="Grab Agent"/>

        <SearchProperty/>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      state: state.route.state,
    }
  }
)(Enquiry)
