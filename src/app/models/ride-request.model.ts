export type RideStage = 'incoming' | 'accepted' | 'pickup' | 'in_progress' | 'completed' | 'cancelled';
export type RideType = 'delivery' | 'transport';

export interface RideRequest {
  id: string;
  type: RideType;
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
  paymentMethod?: string;
  packageDescription?: string;
  recipientName?: string;
  requesterName?: string;
  requesterPhotoUrl?: string;
}
