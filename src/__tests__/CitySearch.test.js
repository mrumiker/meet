import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api'
import { mockData } from '../mock-data';



describe('<CitySearch /> component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => { }} />);
  });

  test('renders text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });
  test('renders a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });
  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });
  test('change state when text input changes', () => {
    CitySearchWrapper.setState({
      query: 'Nashville'
    });
    const eventObject = { target: { value: 'Memphis' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Memphis');
  });
  test('render list of suggestions correctly', () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i++) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });
  test('suggestion list matches the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });
  test('selecting a suggestion should change the query state', () => {
    CitySearchWrapper.setState({
      query: 'Berlin'
    });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });

});