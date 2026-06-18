import { Injectable } from '@angular/core';
import { Observable, Subject, interval, merge, of, throwError } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { IRideRequestRepository } from '../core/interfaces/i-ride-request.repository';
import { RideRequest, RideStage } from '../models/ride-request.model';
import ridesFixture from './fixtures/rides.json';
import { mockDelay, shouldSimulateError } from './mock-delay';

@Injectable()
export class MockRideRequestRepository implements IRideRequestRepository {
  private readonly requests$ = new Subject<RideRequest[]>();
  private activeRides: RideRequest[] = [...(ridesFixture as RideRequest[])];

  constructor() {
    interval(30000)
      .pipe(startWith(0))
      .subscribe(() => this.requests$.next([...this.activeRides]));
  }

  listenForRequests(): Observable<RideRequest[]> {
    return merge(
      of([...this.activeRides]),
      this.requests$.asObservable(),
    );
  }

  acceptRide(rideId: string): Observable<RideRequest> {
    if (shouldSimulateError(0.05)) {
      return throwError(() => new Error('Course déjà prise')).pipe(mockDelay());
    }

    const ride = this.activeRides.find((r) => r.id === rideId);
    if (!ride) {
      return throwError(() => new Error('Course introuvable')).pipe(mockDelay());
    }

    const updated = { ...ride, stage: 'accepted' as RideStage };
    this.activeRides = this.activeRides.filter((r) => r.id !== rideId);
    this.requests$.next([...this.activeRides]);
    return of(updated).pipe(mockDelay());
  }

  refuseRide(rideId: string): Observable<void> {
    this.activeRides = this.activeRides.filter((r) => r.id !== rideId);
    this.requests$.next([...this.activeRides]);
    return of(void 0).pipe(mockDelay(300, 600));
  }

  updateRideStage(rideId: string, stage: RideStage): Observable<RideRequest> {
    return of({
      ...(ridesFixture[0] as RideRequest),
      id: rideId,
      stage,
    }).pipe(mockDelay());
  }
}
