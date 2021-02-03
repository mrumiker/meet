import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';
import { WarningAlert } from './Alert'

class App extends Component {

  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
        selectedLocation: location,
        numberOfEvents: eventCount,
      });
    });
  }

  render() {

    let { events, locations, selectedLocation, numberOfEvents } = this.state;

    return (
      <div className="App">
        <CitySearch locations={locations} numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={numberOfEvents} selectedLocation={selectedLocation} updateEvents={this.updateEvents} />
        <EventList events={events.slice(0, numberOfEvents)} />
        {(numberOfEvents >= events.length) ?
          <WarningAlert text={`End of List. There are ${events.length} events scheduled in ${selectedLocation} at this time.`} /> :
          <WarningAlert text={`There are ${events.length} events scheduled in ${selectedLocation}.  Increase the Number of Events to see more!`} />
        }
      </div>
    );
  }
}

export default App;
