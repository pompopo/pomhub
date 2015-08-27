import React from 'react'
import { connect } from 'react-redux'
import shell from 'shell'

export default class Event extends React.Component {
  render() {
    let e = this.props.event;
    return (
      <div>
        <img className="avatar" src={e.actor.avatar_url}/>
        <span className="repository">{e.repo.name}</span>{this._makeMessage(e)}
      </div>
    );
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
