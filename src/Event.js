import React, { Component } from "react";

class Event extends Component {

  state = {
    selected: false,
  }

  render() {
    const { selected } = this.state;
    const { event } = this.props;
    const eventDetails = selected ? <ul className="event-details"></ul> : ''

    return (
      <div className="event-info">
        <p className="event-title">{event.summary}</p>
        {eventDetails}
        <br />
        <button className="details-button">Details</button>
      </div>


    );
  }
}

export default Event;
