import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IDriverStatusService, DriverAvailabilityStatus } from '../../core/interfaces/i-driver-status.service';

@Injectable()
export class DriverStatusService implements IDriverStatusService {
  setAvailable(): Observable<DriverAvailabilityStatus> {
    return throwError(() => new Error('DriverStatusService: backend NestJS non disponible'));
  }

  setUnavailable(): Observable<DriverAvailabilityStatus> {
    return throwError(() => new Error('DriverStatusService: backend NestJS non disponible'));
  }

  getCurrentStatus(): Observable<DriverAvailabilityStatus> {
    return throwError(() => new Error('DriverStatusService: backend NestJS non disponible'));
  }
}
