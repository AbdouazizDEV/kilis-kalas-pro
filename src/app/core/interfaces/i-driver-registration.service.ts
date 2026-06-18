import { Observable } from 'rxjs';
import {
  DriverRegistrationPayload,
  DriverRegistrationResult,
  DriverVerificationStatus,
} from '../../models/driver.model';

export interface IDriverRegistrationService {
  submitDocuments(payload: DriverRegistrationPayload): Observable<DriverRegistrationResult>;
  getVerificationStatus(driverId: string): Observable<DriverVerificationStatus>;
}
