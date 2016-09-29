import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import agentSearchApp from './reducers';
import { Router } from 'director';
import EnquiryService from './services/EnquiryService';
import App from './App';
import './index.css';

// Needed for onTouchTap
// https://github.com/callemall/material-ui#react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let enquiryService = new EnquiryService();

let store = createStore(
  agentSearchApp,
  applyMiddleware(thunk.withExtraArgument({ enquiryService }))
)

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
