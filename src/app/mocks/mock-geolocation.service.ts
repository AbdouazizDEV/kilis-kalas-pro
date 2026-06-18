import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeoPosition, IGeolocationService } from '../core/interfaces/i-geolocation.service';
import { mockDelay } from './mock-delay';

const BAMBEY_CENTER: GeoPosition = {
  latitude: 14.7044,
  longitude: -16.4565,
  accuracy: 12,
  timestamp: Date.now(),
};

@Injectable()
export class MockGeolocationService implements IGeolocationService {
  getCurrentPosition(): Observable<GeoPosition> {
    return of({ ...BAMBEY_CENTER, timestamp: Date.now() }).pipe(mockDelay(400, 900));
  }

  watchPosition(): Observable<GeoPosition> {
    return of({ ...BAMBEY_CENTER, timestamp: Date.now() }).pipe(mockDelay(300, 600));
  }
}
