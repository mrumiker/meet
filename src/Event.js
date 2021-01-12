import React, { Component } from "react";

class Event extends Component {
  render() {
    const { event } = this.props;
    return (
      <div className="event-info">
        <p className="event-title">{event.summary}</p>
        <br />
        <button className="details-button">Details</button>
      </div>


    );
  }
}

export default Event;
