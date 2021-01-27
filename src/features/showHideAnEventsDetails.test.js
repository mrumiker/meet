import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('Events are collapsed by Default', ({ given, when, then }) => {
    let AppWrapper;
    let EventListWrapper;
    let EventWrapper;
    given('that the user has received a list of events,', async () => {
      AppWrapper = await mount(<App />);
      EventListWrapper = AppWrapper.find('.EventList');
      expect(EventListWrapper).toHaveLength(1);
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
    given('that the user has received a list of events,', () => {

    });

    when('the user selects an event,', () => {

    });

    then('the event’s element expands to show its details.', () => {

    });
  });
  test('Click to Collapse Event Details', ({ given, when, then }) => {
    given('that the user has expanded an event element,', () => {

    });

    when('the user closes that event element,', () => {

    });

    then('the event element collapses to hide its details.', () => {

    });
  });
});
