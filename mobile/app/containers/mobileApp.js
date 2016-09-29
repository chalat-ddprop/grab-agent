'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, AlertIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import RequestList from '../components/requestList';
import { connect } from 'react-redux';

import '../../UserAgent';
import io from 'socket.io-client/socket.io';

class MobileApp extends Component {
  componentWillMount() {
    this.socket = io('http://localhost:3700', {jsonp: false});
    this.socket.on('connect', this.props.onSocketConnect);
    this.socket.on('disconnect', this.props.onSocketDisconnect);
    this.socket.on('message', (data) => {
      AlertIOS.alert("Log", "Socket message = " + JSON.stringify(data));
    });
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View />
        <View>
          <RequestList
            list={this.props.list}
            onSelect={() => {
              AlertIOS.alert("Log", JSON.stringify(this));
            }} />
        </View>
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
  status: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default connect(state => ({
    list: state.list,
    socket: state.socket
  }),
  (dispatch) => {
    return {
      onSocketConnect: () => {
        return dispatch({ type: 'CONNECT' });
      },
      onSocketDisconnect: () => {
        return dispatch({ type: 'DISCONNECT' });
      }
    }
  }
)(MobileApp);
