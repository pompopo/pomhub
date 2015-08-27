import { AUTH_DID_SUCCEED, FETCH_USER_SUCCEED, FETCH_NOTIFICATIONS_SUCCEED, FETCH_EVENTS_SUCCEED} from '../actions/github';

export default function github(state={}, action) {
  switch(action.type) {
    case AUTH_DID_SUCCEED:
      localStorage.auth_token = action.token;

      return Object.assign({}, state, {
        auth_token: action.token,
      });

    case FETCH_USER_SUCCEED:
      localStorage.name = action.user.name;

      return Object.assign({}, state, {
        name: action.user.name,
        avatar_url: action.user.avatar_url
      });

    case FETCH_NOTIFICATIONS_SUCCEED:
      return Object.assign({}, state, {
        notifications: action.data
      });

    case FETCH_EVENTS_SUCCEED:
      return Object.assign({}, state, {
        events: action.data
      });
    default:
      return state;
  }
}
