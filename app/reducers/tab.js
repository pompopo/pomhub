import { TAB_SELECTED } from '../actions/tab';

export default function tab(state={}, action) {
  switch(action.type) {
    case TAB_SELECTED:
      return Object.assign({}, state, {
        index: action.index,
      });
    default:
      return state;
  }
}
