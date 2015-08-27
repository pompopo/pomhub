import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/github'
import { selectTab } from '../actions/tab'
import EventList from './events/event-list'
import NotificationList from './notifications/notification-list'

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
            <div className="menu-item" onClick={this.props.selectNotificationsTab}>
              <span className="mega-octicon octicon-inbox"></span>
              Notifications
            </div>
          </div>
        </div>

        <div id="top-content">
          {this._currentTab()}
        </div>

      </div>
    )
  }

  _currentTab() {
    switch (this.props.tab) {
      case 0:
        return (<EventList events={this.props.events} />)
      case 1:
        return (<NotificationList notifications={this.props.notifications} />)
      default:
        return (<div></div>)

    }
  }
}

function mapStateToProps(state) {
  return {
    image_url: state.github.avatar_url,
    name: state.github.name,
    notifications: state.github.notifications,
    events: state.github.events,
    tab: state.tab.index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
    selectEventsTab: () => dispatch(selectTab(0)),
    selectNotificationsTab: () => dispatch(selectTab(1))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
