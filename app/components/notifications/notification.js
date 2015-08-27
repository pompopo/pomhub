import React from 'react'
import { connect } from 'react-redux'
import { getIssueNumber } from '../../helper'
import shell from 'shell'

export default class Notification extends React.Component {
  render() {
    let n = this.props.notification;
    return (
      <div>
        <div className="notification">
         {this._icon(n)}
          <span className="repository" onClick={this._openRepository(n)}>{n.repository.full_name}</span>
          {n.subject.title}
          <span onClick={this._openIssueOrPullRequest(n)} className="repository">#{getIssueNumber(n.subject.url)}</span>
        </div>
      </div>
    );
  }

  _openRepository(n) {
    return () => {
      var url = 'https://github.com/' + n.repository.full_name + '/';
      shell.openExternal(url);
    }
  }
  _openIssueOrPullRequest(n) {
    return () => {
      var url = 'https://github.com/' + n.repository.full_name + '/';
      switch (n.subject.type) {
        case 'PullRequest':
          url += 'pull/';
          break;
        case 'Issue':
          url += 'issues/';
          break;
        default:
          break;
      }

      url += getIssueNumber(n.subject.url);

      shell.openExternal(url);
    }
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
