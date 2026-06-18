import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IDriverRegistrationService } from '../core/interfaces/i-driver-registration.service';
import {
  DriverRegistrationPayload,
  DriverRegistrationResult,
  DriverVerificationStatus,
} from '../models/driver.model';
import { mockDelay, shouldSimulateError } from './mock-delay';

@Injectable()
export class MockDriverRegistrationService implements IDriverRegistrationService {
  private lastDriverId = 'driver-pending-001';
  private verificationStatus: DriverVerificationStatus = 'pending';

  submitDocuments(payload: DriverRegistrationPayload): Observable<DriverRegistrationResult> {
    if (shouldSimulateError(0.1)) {
      return throwError(() => new Error('Échec de soumission des documents')).pipe(mockDelay());
    }

    this.lastDriverId = `driver-${Date.now()}`;
    this.verificationStatus = 'pending';

    return of<DriverRegistrationResult>({
      success: true,
      driverId: this.lastDriverId,
      verificationStatus: 'pending',
      message: `Demande soumise pour ${payload.firstName} ${payload.lastName}`,
    }).pipe(mockDelay(800, 1500));
  }

  getVerificationStatus(driverId: string): Observable<DriverVerificationStatus> {
    return of(this.verificationStatus).pipe(mockDelay(400, 1000));
  }
}
