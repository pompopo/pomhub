import React from 'react'
import { connect, createStore } from 'react-redux'
import { auth, fetchUser } from '../actions/github'
import util from 'util'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>pomhub</h1>
        <div>token = {this.props.token}</div>
        <button onClick={this.props.auth}>Login</button>
        <button onClick={this.props.debug}>Debug</button>
        <div>name:{this.props.name}</div>
        <div>location:{this.props.location}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {

  console.log('>>>>>>> ' + util.inspect(state));
  return {
    token: state.github.auth_token,
    name: state.github.name,
    location: state.github.location
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    auth: () => dispatch(auth()),
    debug: () => dispatch(fetchUser())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
