import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/github'

export default class Top extends React.Component {
  componentDidMount() {
      this.props.debug();
  }

  render() {
    return (
      <div id="top-container">
        <div id="top-menu">
          <div>
            <img className="avatar" src={this.props.image_url} /> {this.props.name}
          </div>
        </div>
        <div id="top-content">
          コンテンツ
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    image_url: state.github.avatar_url,
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
