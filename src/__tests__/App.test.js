import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

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
