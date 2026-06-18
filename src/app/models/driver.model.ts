import { DocumentUpload } from './document.model';
import { TransportMode } from './vehicle.model';

export type DriverVerificationStatus = 'pending' | 'approved' | 'rejected';

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  profilePhotoUrl?: string;
  transportMode: TransportMode;
  verificationStatus: DriverVerificationStatus;
  createdAt: string;
}

export interface DriverRegistrationPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password?: string;
  transportMode: TransportMode;
  nationalIdFront?: DocumentUpload;
  nationalIdBack?: DocumentUpload;
  licenseFront?: DocumentUpload;
  licenseBack?: DocumentUpload;
  insuranceDocument?: DocumentUpload;
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  vehicleYear?: number;
  profilePhoto?: DocumentUpload;
}

export interface DriverRegistrationResult {
  success: boolean;
  driverId?: string;
  verificationStatus: DriverVerificationStatus;
  message?: string;
}
