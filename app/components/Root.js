import React from 'react'
import { connect } from 'react-redux'
import Top from './top'
import Login from './login'

export default class Root extends React.Component {
  render() {
    if (this.props.token) {
      return (
        <Top />
      );
    } else {
      return (
        <Login />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.github.auth_token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
