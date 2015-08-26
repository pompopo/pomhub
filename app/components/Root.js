import React from 'react'
import { connect, createStore } from 'react-redux'
import { auth } from '../actions/github'
import util from 'util'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>pomhub</h1>
        <div>token = {this.props.token}</div>
        <button onClick={this.props.auth}>Login</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  console.log('>>>>>>> ' + util.inspect(state));
  return {
    token: state.github.auth_token
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    auth: () => dispatch(auth()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
