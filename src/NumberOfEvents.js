import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventCount: 32,
  }

  render() {
    return <div className='NumberOfEvents'><input
      className='events'
      type='number'
      min='0'
      step='1'
      value={this.state.eventCount} /></div>
  }
}

export default NumberOfEvents;