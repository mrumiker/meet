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
  test('render Event title element', () => {
    expect(EventSearchWrapper.find('.event-title')).toHaveLength(1);
  });
});