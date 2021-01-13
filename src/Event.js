import React, { Component } from "react";

class Event extends Component {

  state = {
    selected: false,
  }

  handleButtonClicked = () => {
    this.setState(prevState => ({
      selected: !prevState.selected
    }));
  }

  render() {
    const { selected } = this.state;
    const { event } = this.props;
    const eventDetails = selected ? <div className="event-details">{event.description}</div> : ''

    return (
      <div className="event-info">
        <p className="event-title">{event.summary}</p>
        {eventDetails}
        <br />
        <button className="details-button" onClick={this.handleButtonClicked}>Details</button>
      </div>
    );
  }
}

export default Event;
