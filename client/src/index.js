import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Route, BrowserRouter } from "react-router-dom"

import Login from "./routes/Login"
import MobileNavigation from "./components/mobile/MobileNavigation"

import registerServiceWorker from "./utilities/registerServiceWorker"

ReactDOM.render(
  <BrowserRouter>
    <div>
      <App />
      <MobileNavigation />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
)
registerServiceWorker()
