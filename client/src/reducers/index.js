import { combineReducers } from 'redux'

import categories from './categories'
import error from './error'
import { routerReducer as routing } from 'react-router-redux'
import ui from './ui'
import user from './user'

export default combineReducers({
  categories,
  error,
  routing,
  ui,
  user
})
