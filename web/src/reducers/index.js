import { combineReducers } from 'redux'
import socket from './socket'
import conditions from './conditions'
import route from './route'

const agentSearchApp = combineReducers({
  socket,
  conditions,
  route,
})

export default agentSearchApp
