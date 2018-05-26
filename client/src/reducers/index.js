import { combineReducers } from "redux"

import error from "./error"
import { routerReducer as routing } from "react-router-redux"
import ui from "./ui"
import user from "./user"

export default combineReducers({
  error,
  routing,
  ui,
  user
})
