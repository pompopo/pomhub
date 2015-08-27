import React from 'react'
import { connect } from 'react-redux'
import { fetchUser, fetchNotifications, fetchEvents } from '../actions/github'
import { selectTab } from '../actions/tab'
import EventList from './events/event-list'

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
            <div className="menu-item" onClick={this.props.selectEventsTab}>
              <span className="mega-octicon octicon-octoface"></span>
              Events
            </div>
            <button onClick={this.props.debug}>Debug</button>
          </div>
        </div>
        <div id="top-content">
          <EventList events={this.props.events} />
        </div>

      </div>
    )
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
    selectEventsTab: () => dispatch(selectTab(0)),
    debug: () => dispatch(fetchEvents())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
