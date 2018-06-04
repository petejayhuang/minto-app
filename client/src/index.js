import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import { store, persistor, history } from "./config/store"

import App from "./App"
import registerServiceWorker from "./utilities/registerServiceWorker"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
