import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = {
    errorText: '',
  }

  handleInputChanged = (event) => {

    const value = event.target.value;

    if (value < 0) {
      this.setState({ errorText: 'Don\'t be so Negative 🙃' });
    } else {
      this.setState({ errorText: '' });
      this.props.updateEvents(this.props.selectedLocation, value);
    }
  }

  render() {
    return (<div className='numberOfEvents'>
      <label># of Events to Display:</label>
      <input
        className='events'
        type='number'
        //min='0'
        step='1'
        value={this.props.numberOfEvents}
        onChange={this.handleInputChanged} />
      <ErrorAlert text={this.state.errorText} />
    </div>);
  }
}

export default NumberOfEvents;