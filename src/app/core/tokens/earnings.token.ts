import { InjectionToken } from '@angular/core';
import { IEarningsRepository } from '../interfaces/i-earnings.repository';

export const EARNINGS_REPOSITORY = new InjectionToken<IEarningsRepository>('EARNINGS_REPOSITORY');
