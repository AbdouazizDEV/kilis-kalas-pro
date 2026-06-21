import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { IonIcon, IonSpinner, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mapOutline } from 'ionicons/icons';
import { GoogleMapsLoaderService } from '../../../services/maps/google-maps-loader.service';

export interface MapLatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [IonIcon, IonText, IonSpinner],
  templateUrl: './app-map-view.component.html',
  styleUrls: ['./app-map-view.component.scss'],
})
export class AppMapViewComponent implements AfterViewInit, OnChanges, OnDestroy {
  private readonly mapsLoader = inject(GoogleMapsLoaderService);

  @ViewChild('mapHost') mapHost?: ElementRef<HTMLDivElement>;

  @Input() center: MapLatLng = { lat: 14.7044, lng: -16.4565 };
  @Input() zoom = 14;
  @Input() showDriverMarker = true;
  @Input() routePoints: MapLatLng[] = [];
  @Input() routeDashed = false;
  @Input() destination: MapLatLng | null = null;

  @Output() mapReady = new EventEmitter<google.maps.Map>();

  loading = true;
  loadError = false;

  constructor() {
    addIcons({ mapOutline });
  }

  private map?: google.maps.Map;
  private driverMarker?: google.maps.Marker;
  private routePolyline?: google.maps.Polyline;
  private destinationMarker?: google.maps.Marker;

  ngAfterViewInit(): void {
    void this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) {
      return;
    }

    if (changes['center']) {
      this.map.setCenter(this.center);
      this.updateDriverMarker();
    }

    if (changes['zoom'] && this.zoom) {
      this.map.setZoom(this.zoom);
    }

    if (changes['routePoints'] || changes['routeDashed'] || changes['destination']) {
      this.updateRoute();
    }
  }

  ngOnDestroy(): void {
    this.driverMarker?.setMap(null);
    this.routePolyline?.setMap(null);
    this.destinationMarker?.setMap(null);
  }

  recenter(position: MapLatLng): void {
    this.center = position;
    this.map?.panTo(position);
    this.updateDriverMarker();
  }

  private async initMap(): Promise<void> {
    if (!this.mapHost) {
      return;
    }

    try {
      await this.mapsLoader.load();
      this.map = new google.maps.Map(this.mapHost.nativeElement, {
        center: this.center,
        zoom: this.zoom,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
      });

      this.updateDriverMarker();
      this.updateRoute();
      this.mapReady.emit(this.map);
      this.loadError = false;
    } catch {
      this.loadError = true;
    } finally {
      this.loading = false;
    }
  }

  private updateDriverMarker(): void {
    if (!this.map || !this.showDriverMarker) {
      return;
    }

    if (!this.driverMarker) {
      this.driverMarker = new google.maps.Marker({
        map: this.map,
        position: this.center,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#BF71FD',
          fillOpacity: 1,
          strokeColor: '#983EDF',
          strokeWeight: 2,
        },
      });
      return;
    }

    this.driverMarker.setPosition(this.center);
  }

  private updateRoute(): void {
    if (!this.map) {
      return;
    }

    this.routePolyline?.setMap(null);
    this.destinationMarker?.setMap(null);

    if (this.routePoints.length < 2) {
      return;
    }

    const strokeColor = '#10B981';

    if (this.routeDashed) {
      this.routePolyline = new google.maps.Polyline({
        map: this.map,
        path: this.routePoints,
        strokeOpacity: 0,
        icons: [
          {
            icon: {
              path: 'M 0,-1 0,1',
              strokeOpacity: 1,
              scale: 3,
              strokeColor,
            },
            offset: '0',
            repeat: '16px',
          },
        ],
      });
    } else {
      this.routePolyline = new google.maps.Polyline({
        map: this.map,
        path: this.routePoints,
        strokeColor,
        strokeOpacity: 0.9,
        strokeWeight: 4,
        geodesic: true,
      });
    }

    const endPoint = this.destination ?? this.routePoints[this.routePoints.length - 1];

    this.destinationMarker = new google.maps.Marker({
      map: this.map,
      position: endPoint,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 5,
        fillColor: '#10B981',
        fillOpacity: 1,
        strokeColor: '#09420B',
        strokeWeight: 1,
      },
    });

    const bounds = new google.maps.LatLngBounds();
    this.routePoints.forEach((point) => bounds.extend(point));
    bounds.extend(this.center);
    this.map.fitBounds(bounds, 80);
  }
}
