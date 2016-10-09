import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getEnquiry, cancelEnquiry, acceptAgent, denyAgent } from '../actions';

import CompactList from '../components/CompactList';
import LoadingBar from '../components/LoadingBar';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { blue500 as messageUnreadColor } from 'material-ui/styles/colors';

class RequestAgent extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      agent: null,
    }
  }

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

  componentWillUnmount() {
    if (this.props.enquiry.status !== 'CLOSE') {
      this.props.onCancelEnquiry(this.props.enquiry.key)
    }
  }

  getEnquiry(enquiryKey) {
    this.props.onGetEnquiry(enquiryKey)
  }

  onOpenMessage(agent) {
    this.setState({
      open: true,
      agent: agent,
    })
  }

  onCloseMessage() {
    this.setState({
      open: false,
      agent: null
    })
  }

  onAcceptAgent(agent) {
    this.onCloseMessage();
    this.props.onAcceptAgent(this.props.enquiry.key, agent.agentId);
  }

  onDenyAgent(agent) {
    this.onCloseMessage();
    this.props.onDenyAgent(this.props.enquiry.key, agent.agentId);
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
        let dialogActions = [
          <FlatButton
            label="Close"
            onTouchTap={ this.onCloseMessage.bind(this) }
          />
        ];

        if (this.props.enquiry.status !== 'ACCEPT') {
          dialogActions = [
            <FlatButton
              label="Accept"
              primary={ true }
              icon={ <FontIcon className="material-icons">check</FontIcon> }
              onTouchTap={ this.onAcceptAgent.bind(this, this.state.agent) }
            />,
            <FlatButton
              label="Deny"
              secondary={ true }
              icon={ <FontIcon className="material-icons">close</FontIcon> }
              onTouchTap={ this.onDenyAgent.bind(this, this.state.agent) }
            />,
            ...dialogActions
          ]
        }

        item = (
          <div>
            <List>
              { this.props.enquiry.agents.map((agent) => {
                let icon;

                switch (agent.status) {
                  case 'REQUESTING':
                    icon = <FontIcon className="material-icons spin">sync</FontIcon>
                    break;

                  case 'TYPING':
                    icon = <FontIcon className="material-icons blink">textsms</FontIcon>
                    break;

                  case 'RESPONSED':
                    icon = <FontIcon className="material-icons" color={ messageUnreadColor }>chat</FontIcon>
                    break;

                  default:
                    icon = null;
                }

                return (
                  <ListItem
                    key={ agent.agentId }
                    primaryText={ agent.firstname + " " + agent.lastname }
                    secondaryText={ agent.status.toLowerCase() }
                    leftAvatar={ <Avatar src={ agent.imageUrl } /> }
                    rightIcon={ icon }
                    disabled={ agent.status !== 'RESPONSED' }
                    onClick={ agent.status === 'RESPONSED' ? this.onOpenMessage.bind(this, agent) : null }
                  />
                )
              }) }
            </List>
            <Dialog
                title={ !this.state.agent ? null : [this.state.agent.firstname, this.state.agent.lastname, "responsed with message"].join(' ') }
                actions={ dialogActions }
                modal={ false }
                open={ this.state.open }
                onRequestClose={ this.onCloseMessage }
            >
                { this.state.agent && this.state.agent.message }
            </Dialog>
          </div>
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
    },

    onCancelEnquiry: (enquiryKey) => {
      dispatch(cancelEnquiry(enquiryKey));
    },

    onAcceptAgent: (enquiryKey, agentId) => {
      dispatch(acceptAgent(enquiryKey, agentId));
    },

    onDenyAgent: (enquiryKey, agentId) => {
      dispatch(denyAgent(enquiryKey, agentId));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestAgent)
