import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epic'
import init from './init'
import { rootReducer } from './reducer'

export * from './action'

const isDev = process.env.NODE_ENV === 'development'

const devtoolsCompose = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
const composeEnhancers = (isDev && window[devtoolsCompose]) || compose

const epic = createEpicMiddleware()

function configureStore (initialState) {
  const middlewares = isDev ? [epic, createLogger({ collapsed: true, duration: true })] : [epic]
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  return createStore(rootReducer, initialState, enhancer)
}

export const store = configureStore()
epic.run(rootEpic)

init(store)
