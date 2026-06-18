import { Observable } from 'rxjs';
import { RideRequest, RideStage } from '../../models/ride-request.model';

export interface IRideRequestRepository {
  listenForRequests(): Observable<RideRequest[]>;
  acceptRide(rideId: string): Observable<RideRequest>;
  refuseRide(rideId: string): Observable<void>;
  updateRideStage(rideId: string, stage: RideStage): Observable<RideRequest>;
}
