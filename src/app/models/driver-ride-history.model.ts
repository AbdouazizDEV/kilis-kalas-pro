export type RideHistoryStatus = 'success' | 'failed';

export interface DriverRideHistoryItem {
  id: string;
  plateNumber: string;
  dateLabel: string;
  fareAmount: number;
  mapImageUrl: string;
}

export interface DriverRideHistoryDetail extends DriverRideHistoryItem {
  passengerName: string;
  passengerPhotoUrl: string;
  vehicleInfo: string;
  rideCode: string;
  fullDateLabel: string;
  durationLabel: string;
  distanceLabel: string;
  offerType: string;
  pickupLabel: string;
  dropoffLabel: string;
  paymentMethod: string;
  status: RideHistoryStatus;
}
