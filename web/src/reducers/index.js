import { combineReducers } from 'redux'
import conditions from './conditions'
import route from './route'

const agentSearchApp = combineReducers({
  conditions,
  route,
})

export default agentSearchApp
