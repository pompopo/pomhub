import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/github'

export default class Top extends React.Component {
  render() {
    return (
      <div>
        <h1>pomhub</h1>
        <button onClick={this.props.debug}>Debug</button>
        <div>name:{this.props.name}</div>
        <div>location:{this.props.location}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.github.name,
    location: state.github.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    debug: () => dispatch(fetchUser())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
