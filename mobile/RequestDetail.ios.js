import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  AlertIOS,
} from 'react-native';
import Button from 'react-native-button';

export default class RequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onSubmitButton() {
    AlertIOS.alert("Title", "Alert message : " + this.state.text);
  }

  onCancelButton() {
    AlertIOS.alert("Title", "Cancel button touched");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          A Home Seeker found you!
        </Text>

        <Text style={styles.instructions}>
          Please return him some feedback message
        </Text>

        <Image source={require('./img/me_in_suit_small.jpg')} style={{width: 140, height: 140, margin: 6}} />
        <Text style={styles.instructions}>Chatchai Kritsetsakul{'\n'}</Text>

        <TextInput
          style={{height: 40, padding: 6, marginLeft: 20, marginRight: 20, marginBottom: 10, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}>
        </TextInput>

        <View style={styles.row}>
          <Button
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'green', marginRight: 10}}
            style={{fontSize: 16, color: 'white'}}
            onPress={this.onSubmitButton}>
            Submit
          </Button>
          <Button
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
            style={{fontSize: 16, color: 'white'}}
            onPress={this.onCancelButton}>
            Cancel
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
