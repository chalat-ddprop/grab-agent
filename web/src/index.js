import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'director';
import App from './App';
import configureStore from './store/configureStore';
import './index.css';

// Needed for onTouchTap
// https://github.com/callemall/material-ui#react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = configureStore();

const changePage = (page, id) => {
  store.dispatch({
      type: 'CHANGE_PAGE',
      page: page || 'home',
      id: id || ''
  })
}

var routes = {
  '/([^/]*)/?([^/]*)': (page, id) => { changePage(page, id) }
};

var router = Router(routes);
router.init();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
