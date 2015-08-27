import React from 'react'
import { connect } from 'react-redux'

export default class Event extends React.Component {
  render() {
    let e = this.props.event;
    return (
      <div>
        <img className="avatar" src={e.actor.avatar_url}/>
        {e.actor.login} {this._makeMessage(e)}
      </div>
    );
  }

  _makeMessage(event) {
    switch(event.type) {
      case 'PushEvent':
        return event.repo.name + 'にプッシュしました';
      case 'IssueCommentEvent':
        return event.repo.name + 'コメント - ' + event.payload.comment.body;
      case 'PullRequestReviewCommentEvent':
        return event.repo.name + 'PRコメント - ' + event.payload.comment.body;
      case 'PullRequestEvent':
        return event.repo.name + 'PullRequest ' + event.payload.pull_request.title;
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
