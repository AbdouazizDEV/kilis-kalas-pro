import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IDriverRegistrationService } from '../../core/interfaces/i-driver-registration.service';
import {
  DriverRegistrationPayload,
  DriverRegistrationResult,
  DriverVerificationStatus,
} from '../../models/driver.model';

@Injectable()
export class DriverRegistrationService implements IDriverRegistrationService {
  submitDocuments(payload: DriverRegistrationPayload): Observable<DriverRegistrationResult> {
    return throwError(() => new Error('DriverRegistrationService: backend NestJS non disponible'));
  }

  getVerificationStatus(driverId: string): Observable<DriverVerificationStatus> {
    return throwError(() => new Error('DriverRegistrationService: backend NestJS non disponible'));
  }
}
