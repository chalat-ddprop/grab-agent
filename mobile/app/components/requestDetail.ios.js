import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';

export default class RequestDetail extends Component {
  componentWillMount() {
    this.setState({ message: this.props.defaultMessage || '' });
  }

  handleTextChanged(text) {
    this.setState({ message: text })
    this.props.onChangeMessage();
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

        <Image source={{uri: this.props.item.userProfile.imageUrl}} style={{width: 140, height: 140, margin: 6}} />
        <Text style={styles.instructions}>{this.props.item.userProfile.firstname} {this.props.item.userProfile.lastname}{'\n'}</Text>

        <TextInput
          style={{height: 40, padding: 6, marginLeft: 20, marginRight: 20, marginBottom: 10, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={this.handleTextChanged.bind(this)}
          value={this.state.message}>
        </TextInput>

        <View style={styles.row}>
          <Button
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'green', marginRight: 10}}
            style={{fontSize: 16, color: 'white'}}
            onPress={this.props.onSubmit.bind(this, this.state.message)}>
            Submit
          </Button>
          <Button
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'red'}}
            style={{fontSize: 16, color: 'white'}}
            onPress={this.props.onCancel}>
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
