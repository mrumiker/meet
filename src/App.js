import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import CitySearch from './CitySearch';
import EventGenre from './EventGenre';
import { extractLocations, getEvents } from './api';
import { WarningAlert, ErrorAlert } from './Alert'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    this.setState({
      selectedLocation: location,
      numberOfEvents: eventCount,
    });
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(',').shift();
      return { city, number };
    });
    return data;
  };

  render() {

    let { events, locations, selectedLocation, numberOfEvents } = this.state;

    const filteredEvents = selectedLocation === 'all' ? events : events.filter((event) => event.location === selectedLocation);
    const offlineAlert = navigator.onLine ? '' : <ErrorAlert text={'You are offline. Results loaded from cache may not be up-to-date.'} />;
    const endOfListAlert = numberOfEvents >= filteredEvents.length ?
      <WarningAlert text={`End of List. There are ${filteredEvents.length} events scheduled in ${selectedLocation} at this time.`} /> :
      <WarningAlert text={`There are ${filteredEvents.length} events scheduled in ${selectedLocation}.  Increase the Number of Events to see more!`} />

    return (
      <div className="App">
        <h1>Meet App</h1>
        <CitySearch locations={locations} numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={numberOfEvents} selectedLocation={selectedLocation} updateEvents={this.updateEvents} />
        <div className="data-vis-wrapper">
          <div className="pie-chart">
            <h4>Event Topics</h4>
            <EventGenre events={events} />
          </div>
          <div className="scatter-chart">
            <h4>Events in each city</h4>
            <ResponsiveContainer height={400} >
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis type="number" dataKey="number" name="Number of Events" />
                <Tooltip label="What is this" cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
        {offlineAlert}
        <EventList events={filteredEvents.slice(0, numberOfEvents)} />
        {endOfListAlert}
      </div>
    );
  }
}

export default App;
