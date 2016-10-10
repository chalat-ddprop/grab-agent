import React, { Component } from 'react';
import { connect } from 'react-redux';
import { agentsNotify, agentTyping, agentResponse, agentDeal, updateEnquiryStatus } from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red600 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import AppRoute from './containers/AppRoute';
import AgentSocketService from './services/AgentSocketService';
import { socket as socketConfig } from './constants/socket';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: red600,
  },
});

const styles = {
  container: {
    // textAlign: 'center'
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.socketService = new AgentSocketService(socketConfig.scheme, socketConfig.host, socketConfig.port);
  }

  componentWillMount() {
    this.socketService.connect(this.props.onConnected, this.props.onDisconnected)
    this.socketService.onClientMapped(this.props.onClientMapped);
    this.socketService.onAgentsNotify(this.props.onAgentsNotify);
    this.socketService.onAgentTyping(this.props.onAgentTyping);
    this.socketService.onAgentResponse(this.props.onAgentResponse);
    this.socketService.onAgentDeal(this.props.onAgentDeal);

    var gmap = document.createElement('script');
    gmap.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3nELX2pb92oNoCtQWqvazzngLwwuk1TA');
    gmap.onload = this.props.onGmapLoaded;
    document.body.appendChild(gmap);
  }

  openSocketMessage() {
    this.setState({ openSocketMessage: true });
  }

  hideSocketMessage() {
    this.setState({ openSocketMessage: false });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppRoute/>

          <Snackbar
            open={ this.props.socket.showPopup === true }
            message={ this.props.socket.connected ? "Connected to server" : "Connection Lost" }
            autoHideDuration={ 3000 }
            onRequestClose={ this.closeSocketMessage }
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConnected: () => {
      dispatch({ type: 'CONNECT' })
    },

    onDisconnected: () => {
      dispatch({ type: 'DISCONNECT' })
    },

    closeSocketMessage: () => {
      dispatch({ type: 'CLOSE_POPUP' })
    },

    onClientMapped: (clientId) => {
      dispatch({ type: 'CLIENT_MAPPED', clientId: clientId })
    },

    onAgentsNotify: (data) => {
      if (data.agents.length) {
        dispatch(agentsNotify(data.enquiryKey, data.agents))
      } else {
        dispatch(updateEnquiryStatus('INVALID'))
      }
    },

    onAgentTyping: (data) => {
      dispatch(agentTyping(data.enquiryKey, data.agentId))
    },

    onAgentResponse: (data) => {
      dispatch(agentResponse(data.enquiryKey, data.agentId, data.message))
    },

    onAgentDeal: (data) => {
      dispatch(agentDeal(data.enquiryKey, data.agentProfile))
    },

    onGmapLoaded: () => {
      dispatch({ type: 'SET_GMAP', google: window.google })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
