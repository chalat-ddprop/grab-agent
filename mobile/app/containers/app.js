import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../reducers';
import MobileApp from './mobileApp';

const store = createStore(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MobileApp />
      </Provider>
    );
  }
}
