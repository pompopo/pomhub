import React from 'react'
import { connect } from 'react-redux'
import Event from './event'
import { fetchEvents } from '../../actions/github'

export default class EventList extends React.Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    if (this.props.events) {
      let list = this.props.events.map((e) => {
        return <Event event={e} />
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
    fetch: () => dispatch(fetchEvents())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);
