import { combineReducers } from 'redux';
import list from './list';
import detail from './detail';
import socket from './socket';
import agentResponse from './agentResponse';

const reducers = combineReducers({
  list,
  detail,
  socket,
  agentResponse
});

export default reducers;
