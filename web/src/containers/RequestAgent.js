import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getEnquiry } from '../actions';

import CompactList from '../components/CompactList';
import LoadingBar from '../components/LoadingBar';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';

class RequestAgent extends Component {
  componentDidMount() {
    // if (this.props.enquiryKey) {
    //   this.getEnquiry(this.props.enquiryKey);
    // }
  }

  componentDidUpdate(prevProps) {
    // if (this.props.enquiryKey && prevProps.enquiryKey !== this.props.enquiryKey) {
    //   this.getEnquiry(this.props.enquiryKey);
    // }
  }

  getEnquiry(enquiryKey) {
    this.props.onGetEnquiry(enquiryKey)
  }

  render() {
    let item;

    if (this.props.enquiry == null) {
      item = null
    } else if (this.props.enquiry.status === 'INVALID') {
      item = <List><ListItem>Sorry! No agent is available in this area</ListItem></List>
    } else if (this.props.enquiry.status === 'CLOSE') {

    } else {
      if (this.props.enquiry.agents.length === 0) {
        item = <List><ListItem><CircularProgress /> Looking for agent to serve you ...</ListItem></List>
      } else {
        item = (
          <List>
            { this.props.enquiry.agents.map((agent) => {
              return (
                <ListItem
                  key={ agent.agentId }
                  primaryText={ agent.firstname + " " + agent.lastname }
                  leftAvatar={<Avatar src={ agent.imageUrl } />}
                  rightIcon={
                    agent.status === 'REQUESTING'
                      ? <FontIcon className="material-icons">sync</FontIcon>
                      : <FontIcon className="material-icons">{ agent.status === 'TYPING' ? 'textsms' : 'chat' }</FontIcon>
                  }
                />
              )
            }) }
          </List>
        )
      }
    }

    return (
      <div>
        <AppBar title="Grab Agent"/>
        <LoadingBar display={ this.props.loading } />

        <CompactList>
          { item }
        </CompactList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    enquiry: state.enquiry,
    loading: state.apiConnection.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetEnquiry: (enquiryKey) => {
      dispatch(getEnquiry(enquiryKey));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestAgent)
