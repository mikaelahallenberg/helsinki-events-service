import locations from '../services/helsinki-locations.json';

export const getArea = (locationCode: string) => {
  const area = locations.filter(location => {
    return location.location === locationCode;
  });

  return area[0] ? area[0].coordinates : null;
}
// add tags_search=music
export class EventsPathService {
  getFullPath(locationCode: string) {
    const location = getArea(locationCode);

    if (location) {
      return `http://open-api.myhelsinki.fi/v1/events/?distance_filter=${locationCode},0.2`;
    } else {
      return '';
    }
  }


}
