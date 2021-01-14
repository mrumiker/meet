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
    const eventCount = NumberOfEventsWrapper.state('eventCount');
    expect(NumberOfEventsWrapper.find('.events').prop('value')).toBe(eventCount);
  });
  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      query: 10
    });
    const eventObject = { target: { value: 25 } };
    NumberOfEventsWrapper.find('.events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventCount')).toBe(25);
  });
});
