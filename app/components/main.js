import React from 'react'
import Root from './Root.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index.js'
import thunk from 'redux-thunk'

let storedState = {
  github: {
    auth_token: localStorage.auth_token
  }
};
console.log('state' + require('util').inspect(storedState));

let store = applyMiddleware(thunk)(createStore)(rootReducer, storedState);
React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  document.getElementById('root'))
