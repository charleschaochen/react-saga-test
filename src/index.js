/**
 * 应用入口文件
 * Created by ccn1069 on 2017/3/9.
 */

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store/configureStore'
import { ReduxAsyncConnect } from 'redux-connect'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './App'
import Home from './Home'
require("babel-polyfill");

const dest = document.getElementById('root')
const store = createStore(browserHistory)   // 创建store实例
const history = syncHistoryWithStore(browserHistory, store) // 同步history navigation事件到store中，返回enhanced history实例

ReactDom.render(
    <Provider store={store}>
        <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={history}>
            <Route path={'/'} component={App}>
                <IndexRoute component={Home} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
