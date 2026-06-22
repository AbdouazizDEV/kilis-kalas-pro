import { Component, OnDestroy, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonCol, IonContent, IonGrid, IonMenu, IonRow, IonText, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locateOutline, menuOutline, statsChartOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { IAuthService } from '../../../../core/interfaces/i-auth.service';
import { IDriverStatusService } from '../../../../core/interfaces/i-driver-status.service';
import { IGeolocationService } from '../../../../core/interfaces/i-geolocation.service';
import { IRideRequestRepository } from '../../../../core/interfaces/i-ride-request.repository';
import { AUTH_SERVICE } from '../../../../core/tokens/auth.token';
import { DRIVER_STATUS_SERVICE } from '../../../../core/tokens/driver-status.token';
import { GEOLOCATION_SERVICE } from '../../../../core/tokens/geolocation.token';
import { RIDE_REQUEST_REPOSITORY } from '../../../../core/tokens/ride-request.token';
import { RideRequest } from '../../../../models/ride-request.model';
import { TransportMode } from '../../../../models/vehicle.model';
import { GoogleDirectionsService } from '../../../../services/maps/google-directions.service';
import { PhoneCallService } from '../../../../services/phone/phone-call.service';
import { DriverRegistrationStateService } from '../../../driver-registration/services/driver-registration-state.service';
import { AppCircleIconButtonComponent } from '../../../../shared/ui-kit/app-circle-icon-button/app-circle-icon-button.component';
import { AppCollapsibleBottomSheetComponent } from '../../../../shared/ui-kit/app-collapsible-bottom-sheet/app-collapsible-bottom-sheet.component';
import { AppDriverBottomPanelComponent } from '../../../../shared/ui-kit/app-driver-bottom-panel/app-driver-bottom-panel.component';
import { AppDriverGoButtonComponent } from '../../../../shared/ui-kit/app-driver-go-button/app-driver-go-button.component';
import { AppDriverMenuComponent } from '../../../../shared/ui-kit/app-driver-menu/app-driver-menu.component';
import { DriverMenuItem } from '../../../../shared/ui-kit/app-driver-menu/app-driver-menu.model';
import { AppDriverNavPanelComponent } from '../../../../shared/ui-kit/app-driver-nav-panel/app-driver-nav-panel.component';
import { AppDriverSearchOverlayComponent } from '../../../../shared/ui-kit/app-driver-search-overlay/app-driver-search-overlay.component';
import { AppMapViewComponent, MapLatLng } from '../../../../shared/ui-kit/app-map-view/app-map-view.component';
import { AppRideCompletedSheetComponent } from '../../../../shared/ui-kit/app-ride-completed-sheet/app-ride-completed-sheet.component';
import { AppRideDetailSheetComponent, RideDetailMode } from '../../../../shared/ui-kit/app-ride-detail-sheet/app-ride-detail-sheet.component';
import { AppRideOfferSheetComponent } from '../../../../shared/ui-kit/app-ride-offer-sheet/app-ride-offer-sheet.component';

type DriverHomePhase =
  | 'offline'
  | 'searching'
  | 'offer'
  | 'detail'
  | 'to_pickup'
  | 'at_pickup'
  | 'to_dropoff'
  | 'at_dropoff'
  | 'completed';

const MENU_ITEMS: DriverMenuItem[] = [
  { id: 'profile', icon: 'person-outline', labelKey: 'DRIVER.HOME.MENU_PROFILE' },
  { id: 'dashboard', icon: 'stats-chart-outline', labelKey: 'DRIVER.HOME.MENU_DASHBOARD' },
  { id: 'documents', icon: 'document-text-outline', labelKey: 'DRIVER.HOME.MENU_DOCUMENTS' },
  { id: 'history', icon: 'location-outline', labelKey: 'DRIVER.HOME.MENU_HISTORY' },
  { id: 'passenger', icon: 'car-outline', labelKey: 'DRIVER.HOME.MENU_PASSENGER' },
  { id: 'help', icon: 'help-circle-outline', labelKey: 'DRIVER.HOME.MENU_HELP' },
];

const MENU_ROUTES: Partial<Record<string, string>> = {
  profile: '/driver/profile',
  dashboard: '/driver/dashboard',
  documents: '/driver/documents',
  history: '/driver/history',
  help: '/driver/help',
};

const SEARCH_DELAY_MS = 10_000;

@Component({
  selector: 'app-home-map',
  standalone: true,
  imports: [
    IonMenu,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    TranslatePipe,
    AppMapViewComponent,
    AppCircleIconButtonComponent,
    AppDriverGoButtonComponent,
    AppDriverBottomPanelComponent,
    AppDriverMenuComponent,
    AppDriverSearchOverlayComponent,
    AppRideOfferSheetComponent,
    AppRideDetailSheetComponent,
    AppCollapsibleBottomSheetComponent,
    AppDriverNavPanelComponent,
    AppRideCompletedSheetComponent,
  ],
  templateUrl: './home-map.page.html',
  styleUrls: ['./home-map.page.scss'],
})
export class HomeMapPage implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly menuController = inject(MenuController);
  private readonly authService = inject<IAuthService>(AUTH_SERVICE);
  private readonly driverStatusService = inject<IDriverStatusService>(DRIVER_STATUS_SERVICE);
  private readonly geolocationService = inject<IGeolocationService>(GEOLOCATION_SERVICE);
  private readonly rideRepository = inject<IRideRequestRepository>(RIDE_REQUEST_REPOSITORY);
  private readonly directionsService = inject(GoogleDirectionsService);
  private readonly phoneCallService = inject(PhoneCallService);
  private readonly registrationState = inject(DriverRegistrationStateService);

  @ViewChild(AppMapViewComponent) mapView?: AppMapViewComponent;

  readonly menuId = 'driver-menu';
  readonly contentId = 'driver-home-content';
  readonly menuItems = MENU_ITEMS;
  readonly phase = signal<DriverHomePhase>('offline');
  readonly currentRide = signal<RideRequest | null>(null);
  readonly mapCenter = signal<MapLatLng>({ lat: 14.7044, lng: -16.4565 });
  readonly routePoints = signal<MapLatLng[]>([]);
  readonly routeDashed = signal(false);
  readonly routeDestination = signal<MapLatLng | null>(null);
  readonly remainingKm = signal(0);
  readonly offerCountdown = signal('02:00');
  readonly sheetCollapsed = signal(false);
  readonly completedAt = signal(new Date());

  readonly isNavigating = computed(() => {
    const current = this.phase();
    return current === 'to_pickup' || current === 'to_dropoff';
  });

  readonly showCollapsibleDetail = computed(() => {
    const current = this.phase();
    return current === 'detail' || current === 'at_pickup' || current === 'at_dropoff';
  });

  private searchTimer?: ReturnType<typeof setTimeout>;
  private offerTimer?: ReturnType<typeof setInterval>;
  private navTimer?: ReturnType<typeof setInterval>;
  private offerSecondsLeft = 120;

  constructor() {
    addIcons({ menuOutline, locateOutline, statsChartOutline });
  }

  ngOnInit(): void {
    void this.loadCurrentPosition();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  get fullName(): string {
    const draft = this.registrationState.draft$();
    return [draft.firstName, draft.lastName].filter(Boolean).join(' ') || 'Chauffeur';
  }

  get photoUrl(): string {
    return this.registrationState.draft$().profilePhoto?.dataUrl ?? '';
  }

  get transportMode(): TransportMode | null {
    return this.registrationState.draft$().transportMode;
  }

  get vehicleLabel(): string {
    const draft = this.registrationState.draft$();
    const parts = [draft.vehiclePlate, draft.vehicleBrand, draft.vehicleModel, draft.vehicleColor]
      .filter(Boolean)
      .join(' | ');
    return parts || 'Véhicule';
  }

  get serviceIconSrc(): string {
    const ride = this.currentRide();
    if (!ride) {
      return 'assets/icon/noto_package.svg';
    }
    if (ride.type === 'delivery') {
      return 'assets/icon/noto_package.svg';
    }
    return this.transportMode === 'moto'
      ? 'assets/icon/Motorcycle.png'
      : 'assets/icon/Vehicle.png';
  }

  get serviceLabelKey(): string {
    const ride = this.currentRide();
    return ride?.type === 'transport' ? 'DRIVER.HOME.TRANSPORT' : 'DRIVER.HOME.DELIVERY';
  }

  get requesterPhotoUrl(): string {
    return this.currentRide()?.requesterPhotoUrl ?? this.photoUrl;
  }

  get detailMode(): RideDetailMode {
    switch (this.phase()) {
      case 'at_pickup':
        return 'at_pickup';
      case 'at_dropoff':
        return 'at_dropoff';
      default:
        return 'accepted';
    }
  }

  async openMenu(): Promise<void> {
    await this.menuController.open(this.menuId);
  }

  async closeMenu(): Promise<void> {
    await this.menuController.close(this.menuId);
  }

  async recenterMap(): Promise<void> {
    const position = await firstValueFrom(this.geolocationService.getCurrentPosition());
    const center = { lat: position.latitude, lng: position.longitude };
    this.mapCenter.set(center);
    this.mapView?.recenter(center);
  }

  async goOnline(): Promise<void> {
    if (this.phase() !== 'offline') {
      return;
    }

    await firstValueFrom(this.driverStatusService.setAvailable());
    this.phase.set('searching');
    this.scheduleRideOffer();
  }

  async stopSearch(): Promise<void> {
    this.clearTimers();
    await firstValueFrom(this.driverStatusService.setUnavailable());
    this.resetRideState();
    this.phase.set('offline');
  }

  async toggleAvailability(): Promise<void> {
    const current = this.phase();
    if (current === 'offline') {
      await this.goOnline();
      return;
    }

    if (current === 'searching') {
      await this.stopSearch();
    }
  }

  async onAcceptRide(): Promise<void> {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    this.clearOfferTimer();
    const accepted = await firstValueFrom(this.rideRepository.acceptRide(ride.id));
    this.currentRide.set(accepted);
    this.sheetCollapsed.set(false);
    this.phase.set('detail');
  }

  async onRefuseRide(): Promise<void> {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    this.clearOfferTimer();
    await firstValueFrom(this.rideRepository.refuseRide(ride.id));
    this.resetRideState();
    this.phase.set('searching');
    this.scheduleRideOffer();
  }

  async onDetailPrimaryAction(): Promise<void> {
    switch (this.phase()) {
      case 'detail':
        await this.startNavigationToPickup();
        break;
      case 'at_pickup':
        await this.startNavigationToDropoff();
        break;
      case 'at_dropoff':
        await this.completeRide();
        break;
      default:
        break;
    }
  }

  async onArriveClick(): Promise<void> {
    if (this.phase() === 'to_pickup') {
      this.clearNavTimer();
      this.sheetCollapsed.set(false);
      this.phase.set('at_pickup');
      return;
    }

    if (this.phase() === 'to_dropoff') {
      this.clearNavTimer();
      this.remainingKm.set(0);
      this.sheetCollapsed.set(false);
      this.phase.set('at_dropoff');
    }
  }

  async onCancelRide(): Promise<void> {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    this.clearNavTimer();
    await firstValueFrom(this.rideRepository.refuseRide(ride.id));
    this.resetRideState();
    this.phase.set('searching');
    this.scheduleRideOffer();
  }

  onViewCompletedDetails(): void {
    this.sheetCollapsed.set(false);
    this.phase.set('at_dropoff');
  }

  async onFinishCompleted(): Promise<void> {
    this.resetRideState();
    this.phase.set('searching');
    this.scheduleRideOffer();
  }

  onSheetCollapsedChange(collapsed: boolean): void {
    this.sheetCollapsed.set(collapsed);
  }

  onStatsClick(): void {
    void this.router.navigateByUrl('/driver/dashboard');
  }

  onMenuItemClick(itemId: string): void {
    void this.closeMenu();
    const route = MENU_ROUTES[itemId] ?? '/driver/home';
    void this.router.navigateByUrl(route);
  }

  onLogout(): void {
    this.clearTimers();
    this.authService.logout().subscribe({
      next: () => {
        this.registrationState.reset();
        void this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      },
    });
  }

  onMessageRequester(): void {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    void this.router.navigate(['/driver/chat'], {
      queryParams: {
        rideId: ride.id,
        name: ride.requesterName ?? ride.passengerName,
        phone: ride.passengerPhone,
      },
    });
  }

  onCallRequester(): void {
    const ride = this.currentRide();
    if (!ride?.passengerPhone) {
      return;
    }

    this.phoneCallService.call(ride.passengerPhone);
  }

  private async startNavigationToPickup(): Promise<void> {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    const origin = this.mapCenter();
    const destination = { lat: ride.pickupLat, lng: ride.pickupLng };
    const route = await this.directionsService.getDrivingRoute(origin, destination);

    this.routePoints.set(route.points);
    this.routeDashed.set(true);
    this.routeDestination.set(destination);
    this.remainingKm.set(Number(route.distanceKm.toFixed(1)));
    this.sheetCollapsed.set(true);
    this.phase.set('to_pickup');
    this.startNavigationSimulation();
  }

  private async startNavigationToDropoff(): Promise<void> {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    const origin = { lat: ride.pickupLat, lng: ride.pickupLng };
    const destination = { lat: ride.dropoffLat, lng: ride.dropoffLng };
    const route = await this.directionsService.getDrivingRoute(origin, destination);

    this.routePoints.set(route.points);
    this.routeDashed.set(true);
    this.routeDestination.set(destination);
    this.remainingKm.set(Number(route.distanceKm.toFixed(1)));
    this.sheetCollapsed.set(true);
    this.phase.set('to_dropoff');
    this.startNavigationSimulation();
  }

  private async completeRide(): Promise<void> {
    const ride = this.currentRide();
    if (!ride) {
      return;
    }

    await firstValueFrom(this.rideRepository.updateRideStage(ride.id, 'completed'));
    this.completedAt.set(new Date());
    this.routePoints.set([]);
    this.routeDashed.set(false);
    this.routeDestination.set(null);
    this.phase.set('completed');
  }

  private resetRideState(): void {
    this.currentRide.set(null);
    this.routePoints.set([]);
    this.routeDashed.set(false);
    this.routeDestination.set(null);
    this.remainingKm.set(0);
    this.sheetCollapsed.set(false);
  }

  private async loadCurrentPosition(): Promise<void> {
    try {
      const position = await firstValueFrom(this.geolocationService.getCurrentPosition());
      this.mapCenter.set({ lat: position.latitude, lng: position.longitude });
    } catch {
      // Position par défaut : Bambey
    }
  }

  private scheduleRideOffer(): void {
    this.clearSearchTimer();
    this.searchTimer = setTimeout(() => {
      void this.presentRideOffer();
    }, SEARCH_DELAY_MS);
  }

  private async presentRideOffer(): Promise<void> {
    if (this.phase() !== 'searching') {
      return;
    }

    const rides = await firstValueFrom(this.rideRepository.listenForRequests());
    const ride = this.pickRide(rides);
    if (!ride) {
      this.scheduleRideOffer();
      return;
    }

    this.currentRide.set(ride);
    this.phase.set('offer');
    this.startOfferCountdown();
  }

  private pickRide(rides: RideRequest[]): RideRequest | undefined {
    const incoming = rides.filter((ride) => ride.stage === 'incoming');
    if (!incoming.length) {
      return undefined;
    }

    const preferTransport = this.transportMode === 'moto' || this.transportMode === 'taxi';
    const preferred = incoming.find((ride) =>
      preferTransport ? ride.type === 'transport' : ride.type === 'delivery',
    );
    return preferred ?? incoming[0];
  }

  private startOfferCountdown(): void {
    this.clearOfferTimer();
    this.offerSecondsLeft = 120;
    this.offerCountdown.set(this.formatCountdown(this.offerSecondsLeft));

    this.offerTimer = setInterval(() => {
      this.offerSecondsLeft -= 1;
      this.offerCountdown.set(this.formatCountdown(Math.max(this.offerSecondsLeft, 0)));

      if (this.offerSecondsLeft <= 0) {
        void this.onRefuseRide();
      }
    }, 1000);
  }

  private startNavigationSimulation(): void {
    this.clearNavTimer();
    this.navTimer = setInterval(() => {
      const next = Math.max(this.remainingKm() - 0.1, 0);
      this.remainingKm.set(Number(next.toFixed(1)));
      if (next <= 0) {
        this.clearNavTimer();
      }
    }, 3000);
  }

  private formatCountdown(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes} : ${seconds}`;
  }

  private clearTimers(): void {
    this.clearSearchTimer();
    this.clearOfferTimer();
    this.clearNavTimer();
  }

  private clearSearchTimer(): void {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = undefined;
    }
  }

  private clearOfferTimer(): void {
    if (this.offerTimer) {
      clearInterval(this.offerTimer);
      this.offerTimer = undefined;
    }
  }

  private clearNavTimer(): void {
    if (this.navTimer) {
      clearInterval(this.navTimer);
      this.navTimer = undefined;
    }
  }
}
