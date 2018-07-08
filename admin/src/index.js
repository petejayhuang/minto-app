import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const store = createStore(reducers, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
