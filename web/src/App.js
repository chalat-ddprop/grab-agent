import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red600 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppRoute from './containers/AppRoute';
import Socket from './services/socket-io';
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
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppRoute/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
