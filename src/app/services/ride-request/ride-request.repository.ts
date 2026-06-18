import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IRideRequestRepository } from '../../core/interfaces/i-ride-request.repository';
import { RideRequest, RideStage } from '../../models/ride-request.model';

@Injectable()
export class RideRequestRepository implements IRideRequestRepository {
  listenForRequests(): Observable<RideRequest[]> {
    return throwError(() => new Error('RideRequestRepository: backend NestJS non disponible'));
  }

  acceptRide(rideId: string): Observable<RideRequest> {
    return throwError(() => new Error('RideRequestRepository: backend NestJS non disponible'));
  }

  refuseRide(rideId: string): Observable<void> {
    return throwError(() => new Error('RideRequestRepository: backend NestJS non disponible'));
  }

  updateRideStage(rideId: string, stage: RideStage): Observable<RideRequest> {
    return throwError(() => new Error('RideRequestRepository: backend NestJS non disponible'));
  }
}
