import { Observable } from 'rxjs';

export interface GeoPosition {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

export interface IGeolocationService {
  getCurrentPosition(): Observable<GeoPosition>;
  watchPosition(): Observable<GeoPosition>;
}
