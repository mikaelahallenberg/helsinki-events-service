import { EventsPathService, getArea } from "../services/path-service";

const eventsPathService = new EventsPathService();

test('get correct location code from mock data', () => {
  expect(getArea('MER')).toBe('60.1793,24.9605');
});


test('get full path for target url', () => {
  expect(eventsPathService.getFullPath('VAL')).toBe('http://open-api.myhelsinki.fi/v1/events/distance_filter=60.1944,24.9570,0.3');
});
