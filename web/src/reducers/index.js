import { combineReducers } from 'redux'
import socket from './socket'
import route from './route'
import gmap from './gmap'
import apiConnection from './apiConnection'
import userProfile from './userProfile'
import conditions from './conditions'
import enquiry from './enquiry'

const agentSearchApp = combineReducers({
  socket,
  route,
  gmap,
  apiConnection,
  userProfile,
  conditions,
  enquiry,
})

export default agentSearchApp
