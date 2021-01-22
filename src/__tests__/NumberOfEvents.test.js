import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('renders text input', () => {
    expect(NumberOfEventsWrapper.find('.events')).toHaveLength(1);
  });
  test('renders number input correctly', () => {
    const eventCount = NumberOfEventsWrapper.props().NumberOfEvents;
    expect(NumberOfEventsWrapper.find('.events').prop('value')).toBe(eventCount);
  });
});
