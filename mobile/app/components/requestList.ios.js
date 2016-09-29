import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

export default class RequestList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: ds.cloneWithRows(props.list)
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.data}
        renderRow={(rowData) => <RequestListItem item={rowData} onSelect={this.props.onSelect} />}
      />
    );
  }
}

class RequestListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.listItem} onPress={this.props.onSelect}>
        <View style={styles.listItem_container}>
          <Image source={require('../../img/me_in_suit_small.jpg')} style={{width: 64, height: 64}} />
          <Text style={styles.listItem_customername}>{this.props.item.customer}</Text>
          <Text style={styles.listItem_timestamp}>{moment(this.props.item.timestamp).format('LT')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderColor: '#FFA200',
    backgroundColor: 'white',
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
