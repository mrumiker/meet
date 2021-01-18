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
    const detailsButton = selected ? <button className="details-button" type="button" onClick={this.handleButtonClicked}>Collapse</button> :
      <button className="details-button" type="button" onClick={this.handleButtonClicked}>Details</button>;

    return (
      <div className="event">
        <p className="event-title">{event.summary}</p>
        {eventDetails}
        <br />
        {detailsButton}
      </div>
    );
  }
}

export default Event;
