import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import SearchProperty from './SearchProperty';

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Guru Agent"/>

        <SearchProperty/>

        <List className="center">
          <RaisedButton
            label="Create Request"
            href="#/request-agent"
            secondary={ true }
            disabled={ !this.props.conditions.listingType || !this.props.conditions.propertyType }
            onTouchTap={this.handleTouchTap}
          />
        </List>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      conditions: state.conditions
    }
  },
  (dispatch) => {
    return {
      onClickSubmit: () => {
        window.location('#/request-agent');
      }
    }
  }
)(Home)
