'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { bindActionCreators } from 'redux';
// import Login from '../components/login';
import RequestList from '../components/requestList';
import RequestDetail from '../components/requestDetail';
import { connect } from 'react-redux';

import '../../UserAgent';
import io from 'socket.io-client/socket.io';

class MobileApp extends Component {
  componentWillMount() {
    this.socket = io('http://localhost:3700', {jsonp: false});
    this.socket.on('connect', this.props.onSocketConnect);
    this.socket.on('connect', this.login.bind(this));
    this.socket.on('disconnect', this.props.onSocketDisconnect);
    // this.socket.on('consumer_enquiry', this.refresh.bind(this));
    this.socket.on('consumer_enquiry', this.onConsumerEnquiry.bind(this));
  }

  login(username, password) {
    //TODO: replace belowing hard-code to be fetch('url', {options}, ...)
    this.props.onLoginSuccess({
      agentId: 243703,
      firstname: 'Andrei',
      lastname: 'Blotzu',
      imageUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/422665_2777709124390_659706876_n.jpg?oh=8420581225b63f4c99569c7c471478ba&oe=58A1B1B1',
    });
    this.socket.emit('login', {agentId: 243703});
    // this.refresh();
  }

  // refresh() {
  //   fetch('http://localhost:4300/api/get-enquiries')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       this.props.onRefresh(responseData);
  //     });
  // }

  onConsumerEnquiry(data) {
    this.props.onRefresh([data]);
  }

  messageChange(item) {
    fetch('http://localhost:4300/api/agent_typing', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: item.key })
    });
  }

  submit(item, message) {
    item.message = message;
    fetch('http://localhost:4300/api/agent_response', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then(() => {
      this.refresh();
      this.props.onReset();
    });
  }

  cancel(item) {
    fetch('http://localhost:4300/api/agent_cancel', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: item.key })
    }).then(() => {
      this.refresh();
      this.props.onReset();
    });
  }

  render() {
    var content;
    if (this.props.agentProfile) {
      if (this.props.detail.item) {
        content = <RequestDetail
          item={this.props.detail.item}
          onChangeMessage={this.messageChange.bind(this, this.props.detail.item)}
          onSubmit={this.submit.bind(this, this.props.detail.item)}
          onCancel={this.cancel.bind(this, this.props.detail.item)} />;
      } else {
        content = <RequestList
          list={this.props.list}
          onSelect={this.props.onListItemSelect} />;
      }
    } else {
      // content = <Login onLogin={this.login.bind(this)} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Image source={require('../../img/icon-agenanswer.png')} style={styles.titleLogo} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>GrabAgentMobile</Text>
            <Text>{this.props.agentProfile ? (this.props.agentProfile.firstname + ' ' + this.props.agentProfile.lastname) : ''}</Text>
          </View>
        </View>

        <View>{content}</View>

        <Text style={styles.status}>
          Server {this.props.socket.connected ?
            'connected'
          :
            'disconnected'
          }
        </Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleContainer: {
    flexDirection: 'column',
    marginLeft: 12,
    marginTop: 6,
  },
  title: {
    flexDirection: 'row',
    marginTop: 60,
    alignItems: 'center',
    marginBottom: 8,
  },
  titleLogo: {
    width: 60,
    height: 60,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CC2200',
  },
  status: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default connect(state => ({
    list: state.list,
    detail: state.detail,
    socket: state.socket,
    agentProfile: state.agentProfile,
  }),
  (dispatch) => {
    return {
      onSocketConnect: () => {
        return dispatch({ type: 'CONNECT' });
      },
      onSocketDisconnect: () => {
        return dispatch({ type: 'DISCONNECT' });
      },
      onLoginSuccess: (profile) => {
        return dispatch({ type: 'LOGIN', profile: profile });
      },
      onRefresh: (data) => {
        return dispatch({ type: 'REFRESH', list: data });
      },
      onListItemSelect: (item) => {
        return dispatch({ type: 'SET', item: item });
      },
      onReset: () => {
        return dispatch({ type: 'RESET' });
      }
    }
  }
)(MobileApp);
