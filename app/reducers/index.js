import { combineReducers } from 'redux'
import github from './github'
import tab from './tab'

const rootReducer = combineReducers({
  github,
  tab
});

export default rootReducer;
