import github from 'octonode'
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ASYNC_INCREMENT = 'ASYNC_INCREMENT';

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function async_increment() {
  return dispatch => {
    authenticate();
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  }
}

function authenticate() {
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
        window.close();
      });

    };
  });

  window.loadUrl(auth_url)
}
