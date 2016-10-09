import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';

class Login extends Component {
  componentWillMount() {
    this.setState({
      username: '',
      password: ''
    })
  }

  handleUsernameChanged(value) {
    this.setState({ username: value });
  }

  handlePasswordChanged(value) {
    this.setState({ password: value })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={this.handleUsernameChanged.bind(this)}
          value={this.state.username} />

        <Text>Password</Text>
        <TextInput
          style={styles.textinput}
          secureTextEntry={true}
          onChangeText={this.handlePasswordChanged.bind(this)}
          value={this.state.password} />

        <Button
          containerStyle={{padding:10, marginTop: 20, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}}
          style={{fontSize: 16, color: 'white'}}
          onPress={this.props.onLogin.bind(this.state.username, this.state.password)}>
          Login
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    width: 280,
    height: 40,
    padding: 6,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
});


export default connect(state => ({
    agentProfile: state.agentProfile
  })
)(Login);
