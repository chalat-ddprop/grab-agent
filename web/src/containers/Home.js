import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import UserInfo from './UserInfo';

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Grab Agent"/>

        <UserInfo/>
      </div>
    )
  }
}

export default Home
