import { Type } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AUTH_SERVICE } from '../tokens/auth.token';
import { DRIVER_REGISTRATION_SERVICE } from '../tokens/driver-registration.token';
import { DRIVER_STATUS_SERVICE } from '../tokens/driver-status.token';
import { EARNINGS_REPOSITORY } from '../tokens/earnings.token';
import { GEOLOCATION_SERVICE } from '../tokens/geolocation.token';
import { RIDE_REQUEST_REPOSITORY } from '../tokens/ride-request.token';
import { MockAuthService } from '../../mocks/mock-auth.service';
import { MockDriverRegistrationService } from '../../mocks/mock-driver-registration.service';
import { MockDriverStatusService } from '../../mocks/mock-driver-status.service';
import { MockEarningsRepository } from '../../mocks/mock-earnings.repository';
import { MockGeolocationService } from '../../mocks/mock-geolocation.service';
import { MockRideRequestRepository } from '../../mocks/mock-ride-request.repository';
import { AuthService } from '../../services/auth/auth.service';
import { DriverRegistrationService } from '../../services/driver-onboarding/driver-registration.service';
import { DriverStatusService } from '../../services/driver-status/driver-status.service';
import { EarningsRepository } from '../../services/earnings/earnings.repository';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { RideRequestRepository } from '../../services/ride-request/ride-request.repository';

function provideService<T>(token: unknown, mockClass: Type<T>, realClass: Type<T>) {
  return {
    provide: token,
    useClass: environment.useMocks ? mockClass : realClass,
  };
}

export const SERVICE_PROVIDERS = [
  provideService(AUTH_SERVICE, MockAuthService, AuthService),
  provideService(DRIVER_REGISTRATION_SERVICE, MockDriverRegistrationService, DriverRegistrationService),
  provideService(DRIVER_STATUS_SERVICE, MockDriverStatusService, DriverStatusService),
  provideService(RIDE_REQUEST_REPOSITORY, MockRideRequestRepository, RideRequestRepository),
  provideService(EARNINGS_REPOSITORY, MockEarningsRepository, EarningsRepository),
  provideService(GEOLOCATION_SERVICE, MockGeolocationService, GeolocationService),
];
