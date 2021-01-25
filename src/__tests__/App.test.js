import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import EventList from '../EventList';
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
  test('App passes "locations" and "numberOfEvents" states as props to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    expect(AppWrapper.find(CitySearch).props().numberOfEvents).toEqual(AppNumberOfEventsState);
    AppWrapper.unmount();
  });
  test('App passes "numberOfEvents" and "selectedLocation" states as props to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    const AppSelectedLocationState = AppWrapper.state('selectedLocation');
    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppNumberOfEventsState);
    expect(AppWrapper.find(NumberOfEvents).props().selectedLocation).toEqual(AppSelectedLocationState);
    AppWrapper.unmount();
  });
  test('App passes "events" state, limited by "number of events" state, as prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState.slice(0, AppNumberOfEventsState));
    AppWrapper.unmount();
  });
  test('App loads default number of events when launched', async () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    const allEvents = await getEvents();
    AppWrapper.setState({ events: allEvents });
    const EventListWrapper = AppWrapper.find(EventList);
    expect(EventListWrapper.find('.EventList li')).toHaveLength(AppNumberOfEventsState);
    AppWrapper.unmount();
  });
  test('App updates "numberOfEvents" state when user changes number of events', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const newNumber = Math.floor(Math.random() * (mockData.length)); //generate random positive integer that is </= the number of events in MockData
    const numberObject = { target: { value: newNumber } };
    await NumberOfEventsWrapper.find('.events').simulate('change', numberObject);
    expect(AppWrapper.state('numberOfEvents')).toBe(newNumber);
    AppWrapper.unmount();
  });
  test('App displays correct number of events when Number of Events state is changed', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    const newNumber = Math.floor(Math.random() * (allEvents.length)); //generate random positive integer that is </= the number of events in MockData
    AppWrapper.setState({ events: allEvents });
    AppWrapper.setState({ numberOfEvents: newNumber });
    const EventListWrapper = AppWrapper.find(EventList);
    expect(EventListWrapper.find('.EventList li')).toHaveLength(newNumber);
    AppWrapper.unmount();
  });
  test('App updates "selectedLocation" state when user selects location', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    expect(AppWrapper.state('selectedLocation')).toBe(selectedCity);
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
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  })
});
