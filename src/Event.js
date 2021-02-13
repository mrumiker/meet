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
    const eventDetails = selected ? <div className="event-details">{event.description}</div> : '';
    const eventLink = selected ? <><br /><a href={event.htmlLink} target="_blank" rel="noreferrer">See details on Google Calendar</a></> : '';
    const detailsButton = selected ? <button className="details-btn" type="button" onClick={this.handleButtonClicked}>Collapse</button> :
      <button className="details-btn" type="button" onClick={this.handleButtonClicked}>Details</button>;

    return (
      <div className="event">
        <h1 className="event-title name">{event.summary}</h1>
        <br />
        <h2 className="group-name">{event.location}</h2>
        <br />
        <p>{`${new Date(event.start.dateTime)}`}</p>
        <br />
        {eventDetails}
        {eventLink}
        <br />
        {detailsButton}
      </div>
    );
  }
}

export default Event;
