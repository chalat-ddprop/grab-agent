import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

class RequestList extends Component {
  componentWillMount() {
    this.setState({ dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) });
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
    if (nextProps.list !== this.props.list) {
      console.log('setState');
      this.setState({
        list: nextProps.list,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.list)
      })
    }
  }

  render() {
    return (
      <ListView style={styles.list}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => <RequestListItem item={rowData} onSelect={this.props.onSelect} />}
      />
    );
  }
}

class RequestListItem extends Component {
  render() {
    console.log(this.props.item);
    return (
      <TouchableOpacity style={styles.listItem} onPress={this.props.onSelect.bind(this, this.props.item)}>
        <View style={styles.listItem_container}>
          {/* <Image source={{uri: this.props.item.userProfile.imageUrl}} style={{width: 64, height: 64}} /> */}
          <Text style={styles.listItem_customername}>{this.props.item.userProfile.firstname} {this.props.item.userProfile.lastname}</Text>
          <Text style={styles.listItem_timestamp}>{moment(this.props.item.timestamp).format('LT')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    borderWidth: 1,
    borderColor: '#FFF',
  },
  listItem: {
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#ECF7FA',
    width: 340,
  },
  listItem_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem_customername: {
    fontWeight: 'bold',
    width: 180
  },
  listItem_timestamp: {
    fontSize: 12,
    color: '#BBB',
    marginRight: 18
  }
});


export default connect(
  (state) => {
    return {
      list: state.list
    }
  }
)(RequestList);
