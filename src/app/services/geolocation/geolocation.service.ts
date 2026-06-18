import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GeoPosition, IGeolocationService } from '../../core/interfaces/i-geolocation.service';

@Injectable()
export class GeolocationService implements IGeolocationService {
  getCurrentPosition(): Observable<GeoPosition> {
    return throwError(() => new Error('GeolocationService: Capacitor non configuré'));
  }

  watchPosition(): Observable<GeoPosition> {
    return throwError(() => new Error('GeolocationService: Capacitor non configuré'));
  }
}
