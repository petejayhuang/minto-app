import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const history = createHistory()

const middleware = routerMiddleware(history)

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  applyMiddleware(middleware, thunk, logger)
)

const persistor = persistStore(store)

export { store, persistor, history }
