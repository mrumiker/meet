import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { extractEventInfo } from '../api'
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let eventInfo, EventSearchWrapper;
  beforeAll(() => {
    eventInfo = extractEventInfo(mockData);
    EventSearchWrapper = shallow(<Event event={eventInfo} />)
  });
  test('renders Event element', () => {
    expect(EventSearchWrapper.find('.event-info')).toHaveLength(1);
  });
  test('Event element shows correct Event title', () => {
    expect(EventSearchWrapper.find('.event-title').text()).toBe(eventInfo.summary);
  });
  test('renders Details button', () => {
    expect(EventSearchWrapper.find('.details-button')).toHaveLength(1);
  });
});
