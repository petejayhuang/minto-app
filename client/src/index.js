import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import createHistory from "history/createBrowserHistory"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import reducers from "./reducers"
import thunk from "redux-thunk"
import logger from "redux-logger"

import App from "./App"
import registerServiceWorker from "./utilities/registerServiceWorker"

export const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(reducers, applyMiddleware(middleware, thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
