import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { MockAuthService } from './mock-auth.service';

describe('MockAuthService', () => {
  let service: MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MockAuthService] });
    service = TestBed.inject(MockAuthService);
  });

  it('should register and return success', async () => {
    const result = await firstValueFrom(
      service.register({
        firstName: 'Mamadou',
        lastName: 'Diop',
        phone: '+221771234567',
        password: 'secret1',
      }),
    );
    expect(result.success).toBeTrue();
    expect(result.userId).toBeTruthy();
  });

  it('should validate otp when code has 4 digits', async () => {
    const result = await firstValueFrom(service.verifyOtp('+221771234567', '1234'));
    expect(result.success).toBeTrue();
    expect(result.token).toBe('mock-jwt-token');
  });

  it('should reject invalid otp', async () => {
    const result = await firstValueFrom(service.verifyOtp('+221771234567', '12'));
    expect(result.success).toBeFalse();
  });
});
