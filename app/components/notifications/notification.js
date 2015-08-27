import React from 'react'
import { connect } from 'react-redux'
import { getIssueNumber } from '../../helper'

export default class Notification extends React.Component {
  render() {
    let n = this.props.notification;
    return (
      <div>
        <div className="notification">
         {this._icon(n)}
          <span className="repository">{n.repository.full_name}</span>
          {n.subject.title}
          <span className="repository">#{getIssueNumber(n.subject.url)}</span>


        </div>
      </div>
    );
  }

  _icon(notification) {
    switch (notification.subject.type) {
      case 'PullRequest':
        return (<span className="octicon octicon-git-pull-request"></span>)
      case 'Issue':
        return (<span className="octicon octicon-issue-opened"></span>)
      default:
        return <span></span>
    }
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
