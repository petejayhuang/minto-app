import { combineReducers } from 'redux'

import categories from './categories'
import error from './error'
import feed from './feed'
import messages from './messages'
import product from './product'
import { routerReducer as routing } from 'react-router-redux'
import search from './search'
import store from './store'
import success from './success'
import ui from './ui'
import user from './user'

export default combineReducers({
  categories,
  error,
  feed,
  messages,
  product,
  routing,
  search,
  store,
  success,
  ui,
  user
})
