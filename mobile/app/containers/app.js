import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../reducers';
import MobileApp from './mobileApp';

const store = createStore(reducers, {
  list: [
    {
      customer: 'Chatchai Kritsetsakul',
      conditions: {
        listingType: 'SALE',
        propertyType: 'CONDO',
        bedroom: '1',
        bathroom: '1',
        floorSize: '40'
      },
      timestamp: new Date()
    }
  ]
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MobileApp />
      </Provider>
    );
  }
}
