import { InjectionToken } from '@angular/core';
import { IRideRequestRepository } from '../interfaces/i-ride-request.repository';

export const RIDE_REQUEST_REPOSITORY = new InjectionToken<IRideRequestRepository>(
  'RIDE_REQUEST_REPOSITORY',
);
