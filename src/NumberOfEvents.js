import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventCount: 32,
  }

  handleInputChanged = (event) => {

    const value = event.target.value;

    this.setState({
      eventCount: value,
    });
  }

  render() {
    return (<div className='NumberOfEvents'>
      <input
        className='events'
        type='number'
        min='0'
        step='1'
        value={this.state.eventCount}
        onChange={this.handleInputChanged} />
    </div>);
  }
}

export default NumberOfEvents;