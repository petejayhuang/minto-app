import { combineReducers } from 'redux'

import auth from './auth'
import categories from './categories'
import { routerReducer } from 'react-router-redux'
import orders from './orders'
import users from './users'

export default combineReducers({
  auth,
  categories,
  orders,
  router: routerReducer,
  users
})
