import React, { Component } from 'react';

class NumberOfEvents extends Component {

  handleInputChanged = (event) => {

    const value = event.target.value;

    this.props.updateEvents(this.props.selectedLocation, value);
  }

  render() {
    return (<div className='numberOfEvents'>
      Number of Events: <input
        className='events'
        type='number'
        min='0'
        step='1'
        value={this.props.numberOfEvents}
        onChange={this.handleInputChanged} />
    </div>);
  }
}

export default NumberOfEvents;