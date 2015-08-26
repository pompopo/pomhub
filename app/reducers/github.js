import { AUTH_DID_SUCCEED, FETCH_USER_SUCCEED } from '../actions/github';

export default function github(state={}, action) {
  switch(action.type) {
    case AUTH_DID_SUCCEED:
      localStorage.auth_token = action.token;

      return Object.assign({}, state, {
        auth_token: action.token,
      });

    case FETCH_USER_SUCCEED:
      return Object.assign({}, state, {
        name: action.user.name,
        location: action.user.location
      });
    default:
      return state;
  }
}
