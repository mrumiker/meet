import { mockData } from './mock-data';

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations
}

export const extractEventInfo = events => events[0];

export const getEvents = async () => {
  return mockData;
};
