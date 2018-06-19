import { combineReducers } from "redux"

import categories from "./categories"
import error from "./error"
import product from "./product"
import { routerReducer as routing } from "react-router-redux"
import store from "./store"
import ui from "./ui"
import user from "./user"

export default combineReducers({
  categories,
  error,
  product,
  routing,
  ui,
  user,
  store
})
