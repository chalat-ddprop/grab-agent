import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SearchProperty from './SearchProperty';

class Enquiry extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Grab Agent"/>

        <SearchProperty/>
      </div>
    )
  }
}

export default Enquiry
