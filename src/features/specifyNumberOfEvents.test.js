import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('32 Events are displayed by default', ({ given, when, then }) => {
    let AppWrapper;
    given('that the user has not specified a preferred number of events,', () => {

    });

    when('the user receives a list of events,', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
    });

    then('thirty two events will be listed by default.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(32);
    });
  });
  test('The user may specify the number of events to display', ({ given, when, then }) => {
    let AppWrapper;
    given('that the user has specified a preferred number of events,', () => {
      AppWrapper = mount(<App />);
      const numberObject = { target: { value: 42 } };
      AppWrapper.find('.events').simulate('change', numberObject);
    });

    when('the user receives a list of events,', () => {
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
    });

    then('that number of events will be listed.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(42);
    });
  });
});





