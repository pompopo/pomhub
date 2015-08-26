import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/github'

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.auth}>ログインしてね</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
)(Login);
