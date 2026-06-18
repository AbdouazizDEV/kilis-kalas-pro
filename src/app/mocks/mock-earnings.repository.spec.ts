import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { MockEarningsRepository } from './mock-earnings.repository';

describe('MockEarningsRepository', () => {
  let repository: MockEarningsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MockEarningsRepository] });
    repository = TestBed.inject(MockEarningsRepository);
  });

  it('should return daily earnings', async () => {
    const summary = await firstValueFrom(repository.getDailyEarnings());
    expect(summary.total).toBeGreaterThan(0);
    expect(summary.rideCount).toBeGreaterThan(0);
  });

  it('should return earnings history', async () => {
    const history = await firstValueFrom(repository.getHistory());
    expect(history.length).toBeGreaterThan(0);
  });

  it('should reject withdrawal below minimum', async () => {
    await expectAsync(
      firstValueFrom(repository.requestWithdrawal({ amount: 500, method: 'wave' })),
    ).toBeRejected();
  });
});
