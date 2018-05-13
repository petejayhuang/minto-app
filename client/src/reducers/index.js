import { combineReducers } from "redux"
import ui from "./ui"
import user from "./user"
import { routerReducer as routing } from "react-router-redux"

export default combineReducers({
  routing,
  ui,
  user
})
