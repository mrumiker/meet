import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import EventList from '../EventList';
import Event from '../Event';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  test('render Number of Events field', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {

  test('App passes "events" state as prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });
  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppNumberOfEventsState);
    AppWrapper.unmount();
  });
  test('App loads default number of events when launched', async () => {
    // We expect the App to load the amount of events we have in our mock-data, which is 2
    const AppWrapper = mount(<App />);
    const expectedNumberOfEvents = mockData.length;
    const allEvents = await getEvents();
    // Since we are calling getEvents from localhost during testing, getEvents will return mock-data
    // Mock-data only has 2 events in it, so we do not need to slice when setting the App state
    AppWrapper.setState({ events: allEvents });
    const EventListWrapper = AppWrapper.find(EventList);
    // The reason I search for Event component instead of 'EventList li' is personal preference
    expect(EventListWrapper.find(Event)).toHaveLength(expectedNumberOfEvents);
    AppWrapper.unmount();
  });
  test('App updates "numberOfEvents" state when user changes number of events', async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ numberOfEvents: 4 });
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const numberObject = { target: { value: 7 } };
    await NumberOfEventsWrapper.find('.events').simulate('change', numberObject);
    expect(AppWrapper.state('numberOfEvents')).toBe(7);
    AppWrapper.unmount();
  });
  test('App displays correct number of events when Number of Events input is changed by user', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    // Since we only have 2 events in our mock-data, we are limited to simulating the result from picking 1 event to be displayed
    const newNumber = 1;
    const allEvents = await getEvents();
    const numberObject = { target: { value: newNumber } };
    await NumberOfEventsWrapper.find('.events').simulate('change', numberObject);
    AppWrapper.setState({ events: allEvents.slice(0, newNumber) });
    const EventListWrapper = AppWrapper.find(EventList);
    expect(EventListWrapper.find('EventList li')).toHaveLength(newNumber);
    AppWrapper.unmount();
  });
  test('App updates "selectedLocation" state when user selects location', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    await CitySearchWrapper.instance().handleItemClicked('London, UK');
    expect(AppWrapper.state('selectedLocation')).toBe('London, UK');
    AppWrapper.unmount();
  });
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const numberOfEvents = AppWrapper.state('numberOfEvents');
    const eventsToShow = allEvents.filter(event => event.location === selectedCity).slice(0, numberOfEvents);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test('get list of all events, limited by selected "number of events", when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const numberOfEvents = AppWrapper.state('numberOfEvents')
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, numberOfEvents));
    AppWrapper.unmount();
  })
});
