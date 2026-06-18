import { InjectionToken } from '@angular/core';
import { IDriverRegistrationService } from '../interfaces/i-driver-registration.service';

export const DRIVER_REGISTRATION_SERVICE = new InjectionToken<IDriverRegistrationService>(
  'DRIVER_REGISTRATION_SERVICE',
);
