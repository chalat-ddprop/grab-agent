import { combineReducers } from 'redux'
import socket from './socket'
import route from './route'
import userProfile from './userProfile'
import conditions from './conditions'

const agentSearchApp = combineReducers({
  socket,
  route,
  userProfile,
  conditions,
})

export default agentSearchApp
