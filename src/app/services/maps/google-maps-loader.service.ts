import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IGoogleMapsLoaderService } from '../../core/interfaces/i-google-maps-loader.service';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService implements IGoogleMapsLoaderService {
  private loadPromise: Promise<typeof google> | null = null;

  isLoaded(): boolean {
    return typeof google !== 'undefined' && !!google.maps;
  }

  load(): Promise<typeof google> {
    if (this.isLoaded()) {
      return Promise.resolve(google);
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    const apiKey = environment.googleMapsApiKey;
    if (!apiKey) {
      return Promise.reject(new Error('Google Maps API key is missing in environment'));
    }

    this.loadPromise = new Promise((resolve, reject) => {
      const scriptId = 'google-maps-js';
      const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (existing) {
        existing.addEventListener('load', () => resolve(google));
        existing.addEventListener('error', () => reject(new Error('Google Maps script failed to load')));
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
      script.onload = () => resolve(google);
      script.onerror = () => reject(new Error('Google Maps script failed to load'));
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }
}
