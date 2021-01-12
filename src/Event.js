import React, { Component } from "react";

class Event extends Component {
  render() {
    const { event } = this.props;
    return <div className="event-title">{event.summary}</div>;
  }
}

export default Event;
