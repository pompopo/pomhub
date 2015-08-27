import React from 'react'
import { connect } from 'react-redux'
import Notification from './notification'
import { fetchNotifications } from '../../actions/github'

export default class NotificationList extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    if (this.props.notifications) {
      let list = this.props.notifications.map((e) => {
        return <Notification notification={e} />
      });
      return (<div>{list}</div>)
    } else {
      return (<span>イベントなし</span>);
    }
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetchNotifications())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationList);
