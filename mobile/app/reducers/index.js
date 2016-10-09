import { combineReducers } from 'redux';
import list from './list';
import detail from './detail';
import socket from './socket';
// import agentProfile from './agentProfile';
import agentResponse from './agentResponse';

const reducers = combineReducers({
  list,
  detail,
  socket,
  // agentProfile,
  agentResponse
});

export default reducers;
