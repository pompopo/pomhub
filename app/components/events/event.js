import React from 'react'
import { connect } from 'react-redux'
import shell from 'shell'

export default class Event extends React.Component {
  render() {
    let e = this.props.event;
    return (
      <div className="event">
        {this._icon(e)}
        <span className="repository">{e.repo.name}</span>{this._makeMessage(e)}
      </div>
    );
  }

  _icon(event) {
    switch(event.type) {
      case 'PushEvent':
        return (<span className="octicon octicon-repo-push"></span>)
      case 'IssueCommentEvent':
      case 'PullRequestReviewCommentEvent':
        return (<span className="octicon octicon-comment"></span>)
      case 'PullRequestEvent':
        return (<span className="octicon octicon-git-pull-request"></span>)
      case 'IssuesEvent':
        return (<span className="octicon octicon-issue-opened"></span>)
      case 'DeleteEvent':
        return (<span className="octicon octicon-trashcan"></span>);
      case 'CreateEvent':
        // FIXME
        return (<span class="octicon octicon-plus"></span>);
      case 'WatchEvent':
        return (<span className="octicon octicon-star"></span>)
      default:
        return (<span></span>)
    }
  }

  _openCommit(commit, event) {
    return () => {
      let url = 'https://github.com/' + event.repo.name + '/commit/' + commit.sha;
      shell.openExternal(url);
    }
  }

  _makeMessage(event) {
    switch(event.type) {
      case 'PushEvent':
        var message = 'にプッシュしました';
        var commits = event.payload.commits.map((commit) => {
          return (<div onClick={this._openCommit(commit, event)}>{commit.message}</div>);
        });

        return (<span>{message}{commits}</span>)
      case 'IssueCommentEvent':
        return 'コメント - ' + event.payload.comment.body;
      case 'PullRequestReviewCommentEvent':
        return 'PRコメント - ' + event.payload.comment.body;
      case 'PullRequestEvent':
        return 'PullRequest ' + event.payload.pull_request.title;
      case 'IssuesEvent':
        return event.payload.action + ' ' + event.payload.issue.title;
      case 'DeleteEvent':
        return 'delete ' + event.payload.ref_type + ' ' + event.payload.ref;
      case 'CreateEvent':
        return 'create ' + event.payload.ref_type + ' ' + event.payload.ref;
      case 'WatchEvent':
        return 'starred ' + event.repo.name;
      default:
        return event.type;
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
)(Event);
