import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import EventList from '../EventList';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('renders text input', () => {
    expect(NumberOfEventsWrapper.find('.events')).toHaveLength(1);
  });
  test('renders number input correctly', () => {
    const eventCount = NumberOfEventsWrapper.state('eventCount');
    expect(NumberOfEventsWrapper.find('.events').prop('value')).toBe(eventCount);
  });
});
