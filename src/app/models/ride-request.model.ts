export type RideStage = 'incoming' | 'accepted' | 'pickup' | 'in_progress' | 'completed' | 'cancelled';

export interface RideRequest {
  id: string;
  passengerName: string;
  passengerPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  estimatedFare: number;
  distanceKm: number;
  stage: RideStage;
  expiresAt: string;
  createdAt: string;
}
