import { combineReducers } from 'redux';
import list from './list';
import socket from './socket';

const reducers = combineReducers({
  list,
  socket
});

export default reducers;
