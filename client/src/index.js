import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import thunk from "redux-thunk"
import logger from "redux-logger"

import App from "./App"
import registerServiceWorker from "./utilities/registerServiceWorker"
import reducers from "./reducers"
import { applyMiddleware, createStore } from "redux"

const store = createStore(reducers, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
