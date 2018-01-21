/**
 * 创建store，配置middlewares
 */
import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../rootReducer'
import sagaRunner from '../sagaRunner'

export default function createStore(history, data) {
    const reduxRouterMiddleware = routerMiddleware(history)

    const sagaMiddleware = createSagaMiddleware();

    const middleware = [reduxRouterMiddleware, sagaMiddleware, thunk]

    const finalCreateStore = applyMiddleware(...middleware)(_createStore)

    const store = finalCreateStore(rootReducer, data,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    sagaRunner(sagaMiddleware);

    return store
}