import github from 'octonode'
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');

export const AUTH_DID_SUCCEED = 'AUTH_DID_SUCCEED';
export const FETCH_USER_SUCCEED = 'FETCH_USER_SUCCEED';
export const FETCH_NOTIFICATIONS_SUCCEED = 'FETCH_NOTIFICATIONS_SUCCEED';

function getToken(getState) {
  return getState().github.auth_token;
}

export function fetchNotifications() {
    return (dispatch, getState) => {
      let token = getToken(getState);
      let client = github.client(token).me();
      client.notifications({participating: true}, (err, response) => {
        dispatch({
          type: FETCH_NOTIFICATIONS_SUCCEED,
          data: response
        });
      });
    }
}

function auth_did_succeed(token) {
    return {
      type: AUTH_DID_SUCCEED,
      token: token
    }
}

export function fetchUser() {
    return (dispatch, getState) => {
      let token = getState().github.auth_token;
      let client = github.client(token);
      client.get('/user', {}, (err, status, body, header) => {
        dispatch({
          type: FETCH_USER_SUCCEED,
          user: body
        });
      });
    }
}

export function auth() {
  return (dispatch) => {
    var auth_url = github.auth.config({
      id: '358f22de71598257b9df',
      secret: 'f759df34aa2f1dedbe6f07103bb46dfd1d5002b6'
    }).login(['user', 'repo', 'gist']);

    var state = auth_url.match(/&state=([0-9a-z]{32})/i);

    var window = new BrowserWindow({ width: 800, height: 600});
    window.webContents.on('will-navigate', (event, url) => {

      let matched;
      if (matched = url.match(/\?code=([^&]*)&state=([^&]*)/)) {
        let code = matched[1];
        github.auth.login(code, function (err, token) {
          dispatch(auth_did_succeed(token));
          window.close();
        });

      };
    });

    window.loadUrl(auth_url)
  }
}
