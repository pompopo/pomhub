import React from 'react'
import Root from './Root.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index.js'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

var defaultState = {
  github: {
    auth_token: undefined,    // GitHub トークン(String)
    name: '',                 // 認証中のユーザ名(String)
    avatar_url: '',           // 認証中のユーザのプロフィール画像URL(String)
    events: undefined         // イベント一覧(Array Object)
  },

  tab: {
    index: 0      // 選択中のタブ
  }
}
defaultState.github.auth_token = localStorage.auth_token;
defaultState.github.name = localStorage.name;

let logger = createLogger();
let store = applyMiddleware(thunk, logger)(createStore)(rootReducer, defaultState);
React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  document.getElementById('root'))
