import React from 'react'
import { connect } from 'react-redux'
import { fetchUser, fetchNotifications } from '../actions/github'

export default class Top extends React.Component {
  componentDidMount() {
      this.props.fetchUser();
  }

  render() {
    return (
      <div id="top-container">
        <div id="top-menu">
          <div>
            <img className="avatar" src={this.props.image_url} /> {this.props.name}
            <button onClick={this.props.debug}>Debug</button>
          </div>
        </div>
        <div id="top-content">
          <ul>
          {this._notificationTitle(this.props.notifications)}
          </ul>
        </div>

      </div>
    )
  }

  _notificationTitle(notifications) {
    if (notifications) {
      return notifications.map((n) => {
        return (
            <li>[{n.repository.full_name}]({n.subject.type}){n.subject.title} </li>
        );
      });
    } else {
      return 'データなし';
    }
  }
}

function mapStateToProps(state) {
  return {
    image_url: state.github.avatar_url,
    name: state.github.name,
    notifications: state.github.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
    debug: () => dispatch(fetchNotifications())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
