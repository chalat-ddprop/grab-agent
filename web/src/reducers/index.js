import { combineReducers } from 'redux'
import socket from './socket'
import route from './route'
import apiConnection from './apiConnection'
import userProfile from './userProfile'
import conditions from './conditions'
import enquiries from './enquiries'

const agentSearchApp = combineReducers({
  socket,
  route,
  apiConnection,
  userProfile,
  conditions,
  enquiries,
})

export default agentSearchApp
