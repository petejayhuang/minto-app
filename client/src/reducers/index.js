import { combineReducers } from 'redux'
import { LOGOUT_USER } from '../actions/types'

import categories from './categories'
import error from './error'
import feed from './feed'
import likes from './likes'
import messages from './messages'
import orderConfirmed from './orderConfirmed'
import product from './product'
import { routerReducer as routing } from 'react-router-redux'
import search from './search'
import store from './store'
import success from './success'
import ui from './ui'
import user from './user'

const appReducer = combineReducers({
  categories,
  error,
  feed,
  likes,
  messages,
  orderConfirmed,
  product,
  routing,
  search,
  store,
  success,
  ui,
  user
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) return {}
  return appReducer(state, action)
}

export default rootReducer
