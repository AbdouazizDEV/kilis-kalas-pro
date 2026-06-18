import { Observable } from 'rxjs';

export type DriverAvailabilityStatus = 'available' | 'unavailable' | 'on_ride';

export interface IDriverStatusService {
  setAvailable(): Observable<DriverAvailabilityStatus>;
  setUnavailable(): Observable<DriverAvailabilityStatus>;
  getCurrentStatus(): Observable<DriverAvailabilityStatus>;
}
