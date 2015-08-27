import React from 'react'
import { connect } from 'react-redux'
import { fetchUser, fetchNotifications, fetchEvents } from '../actions/github'

export default class Top extends React.Component {
  componentDidMount() {
      this.props.fetchUser();
      // this.props.fetchEvents();
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
          <span className="mega-octicon octicon-inbox"></span>
          <ul>
            {this._viewForEvents(this.props.events)}
          </ul>
        </div>

      </div>
    )
  }

  _viewForEvents(events) {
    if (events) {
      return events.filter((e) => {
        return true;
      }).map((e) => {
        return (
          <li><img className="avatar" src={e.actor.avatar_url}/>{e.actor.login} {e.type} </li>
        );
      });
    } else {
      return 'イベントなし'
    }

  }

  _notificationTitle(notifications) {
    if (notifications) {
      return notifications.filter((n) => {
        return n.reason === 'comment';
      }).map((n) => {
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
    notifications: state.github.notifications,
    events: state.github.events
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchEvents: () => dispatch(fetchEvents()),
    debug: () => dispatch(fetchEvents())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
