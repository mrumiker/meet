import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('the user hasn’t searched for any city', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);

    });

    then('the user should see a list of 32 upcoming events.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(32);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper;
    given('the main page is open,', () => {
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={extractLocations(mockData)} />);
    });

    when('the user starts typing in the city text box', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('the user should see a list of suggested cities that match what they’ve typed.', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    let AppWrapper;
    given('the user was typing the name of a city in the city text box', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    and('the list of suggested cities was showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('the user selects a city from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city.', () => {
      expect(AppWrapper.find('.event')).toHaveLength(32);
    });
  });

});
