import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { MockDriverRegistrationService } from './mock-driver-registration.service';
import { DriverRegistrationPayload } from '../models/driver.model';

const payload: DriverRegistrationPayload = {
  firstName: 'Mamadou',
  lastName: 'Diop',
  phone: '+221771234567',
  transportMode: 'moto',
  vehicleBrand: 'Honda',
  vehicleModel: 'CG125',
  vehiclePlate: 'DK-1234-AB',
  vehicleColor: 'Rouge',
};

describe('MockDriverRegistrationService', () => {
  let service: MockDriverRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MockDriverRegistrationService] });
    service = TestBed.inject(MockDriverRegistrationService);
  });

  it('should submit documents and return pending status', async () => {
    const result = await firstValueFrom(service.submitDocuments(payload));
    expect(result.success).toBeTrue();
    expect(result.verificationStatus).toBe('pending');
    expect(result.driverId).toBeTruthy();
  });

  it('should return verification status', async () => {
    const status = await firstValueFrom(service.getVerificationStatus('driver-001'));
    expect(status).toBe('pending');
  });
});
