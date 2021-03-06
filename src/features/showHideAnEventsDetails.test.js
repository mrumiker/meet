import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('Events are collapsed by Default', ({ given, when, then }) => {
    let AppWrapper, EventWrapper;
    given('that the user has received a list of events,', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
    });

    when('the user has not selected an event,', () => {

    });

    then('that event’s details are collapsed by default.', () => {
      AppWrapper.update();
      EventWrapper = AppWrapper.find('.event');
      expect(EventWrapper.find('.event-title').at(0)).toHaveLength(1);
      expect(EventWrapper.find('.event-details').at(0)).toHaveLength(0);
    });
  });
  test('Click to Expand Event Details', ({ given, when, then }) => {
    let AppWrapper, EventWrapper;
    given('that the user has received a list of events,', () => {
      AppWrapper = mount(<App />);
    });

    when('the user selects an event,', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event’s element expands to show its details.', () => {
      EventWrapper = AppWrapper.find('.event');
      expect(EventWrapper.find('.event-details').at(0)).toHaveLength(1);
    });
  });

  test('Click to Collapse Event Details', ({ given, when, then }) => {
    let EventWrapper;
    given('that the user has expanded an event element,', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ selected: true });
      expect(EventWrapper.find('.event-details')).toHaveLength(1);
    });

    when('the user closes that event element,', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event element collapses to hide its details.', () => {
      expect(EventWrapper.find('.event-details')).toHaveLength(0);
    });
  });
}); 
