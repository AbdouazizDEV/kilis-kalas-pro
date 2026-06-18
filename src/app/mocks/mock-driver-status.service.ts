import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IDriverStatusService, DriverAvailabilityStatus } from '../core/interfaces/i-driver-status.service';
import { mockDelay } from './mock-delay';

@Injectable()
export class MockDriverStatusService implements IDriverStatusService {
  private readonly status$ = new BehaviorSubject<DriverAvailabilityStatus>('unavailable');

  setAvailable(): Observable<DriverAvailabilityStatus> {
    this.status$.next('available');
    return of<DriverAvailabilityStatus>('available').pipe(mockDelay(300, 700));
  }

  setUnavailable(): Observable<DriverAvailabilityStatus> {
    this.status$.next('unavailable');
    return of<DriverAvailabilityStatus>('unavailable').pipe(mockDelay(300, 700));
  }

  getCurrentStatus(): Observable<DriverAvailabilityStatus> {
    return this.status$.asObservable();
  }
}
