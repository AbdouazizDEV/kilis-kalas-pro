import { Injectable, inject } from '@angular/core';
import { MapLatLng } from '../../shared/ui-kit/app-map-view/app-map-view.component';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

export interface DrivingRouteResult {
  points: MapLatLng[];
  distanceKm: number;
}

@Injectable({ providedIn: 'root' })
export class GoogleDirectionsService {
  private readonly mapsLoader = inject(GoogleMapsLoaderService);

  async getDrivingRoute(origin: MapLatLng, destination: MapLatLng): Promise<DrivingRouteResult> {
    try {
      await this.mapsLoader.load();
      return await this.fetchDirections(origin, destination);
    } catch {
      return this.fallbackRoute(origin, destination);
    }
  }

  private fetchDirections(origin: MapLatLng, destination: MapLatLng): Promise<DrivingRouteResult> {
    return new Promise((resolve) => {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
            const route = result.routes[0];
            const leg = route.legs[0];
            const points = route.overview_path.map((point) => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
            resolve({
              points,
              distanceKm: (leg?.distance?.value ?? 0) / 1000,
            });
            return;
          }

          resolve(this.fallbackRoute(origin, destination));
        },
      );
    });
  }

  private fallbackRoute(origin: MapLatLng, destination: MapLatLng): DrivingRouteResult {
    return {
      points: this.interpolatePoints(origin, destination, 12),
      distanceKm: this.haversineKm(origin, destination),
    };
  }

  private interpolatePoints(from: MapLatLng, to: MapLatLng, steps: number): MapLatLng[] {
    const points: MapLatLng[] = [];
    for (let index = 0; index <= steps; index += 1) {
      const ratio = index / steps;
      points.push({
        lat: from.lat + (to.lat - from.lat) * ratio,
        lng: from.lng + (to.lng - from.lng) * ratio,
      });
    }
    return points;
  }

  private haversineKm(from: MapLatLng, to: MapLatLng): number {
    const earthRadiusKm = 6371;
    const dLat = this.toRad(to.lat - from.lat);
    const dLng = this.toRad(to.lng - from.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(from.lat)) * Math.cos(this.toRad(to.lat)) * Math.sin(dLng / 2) ** 2;
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
