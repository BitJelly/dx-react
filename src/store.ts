import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { History } from 'history'
import thunk from 'redux-thunk'

import CrashReporter from 'middlewares/CrashReporter'
import LocalStorageDump from 'middlewares/LocalStorageDump'
import LocalStorageLoad from 'middlewares/LocalStorageLoad'
import Notifications from 'middlewares/Notifications'

import { State } from 'types'

import reducer from 'reducers'

export default function (history: History, initialState?: Partial<State>) {
  const middlewares = [
    thunk,
    routerMiddleware(history),
    Notifications,
    LocalStorageLoad,
    LocalStorageDump,
    CrashReporter,
  ]

  const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  const store = createStore(connectRouter(history)(reducer), initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(connectRouter(history)(nextReducer))
    })
  }

  return store
}