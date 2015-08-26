import { AUTH_DID_SUCCEED } from '../actions/github';

export default function github(state={}, action) {
  switch(action.type) {
    case AUTH_DID_SUCCEED:
      return Object.assign({}, state, {
        auth_token: action.token,
      });
    default:
      return state;
  }
}
