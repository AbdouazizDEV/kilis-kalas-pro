import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IEarningsRepository } from '../../core/interfaces/i-earnings.repository';
import {
  EarningEntry,
  EarningsSummary,
  WithdrawalRequest,
  WithdrawalResult,
} from '../../models/earning.model';

@Injectable()
export class EarningsRepository implements IEarningsRepository {
  getDailyEarnings(): Observable<EarningsSummary> {
    return throwError(() => new Error('EarningsRepository: backend NestJS non disponible'));
  }

  getWeeklyEarnings(): Observable<EarningsSummary> {
    return throwError(() => new Error('EarningsRepository: backend NestJS non disponible'));
  }

  getHistory(): Observable<EarningEntry[]> {
    return throwError(() => new Error('EarningsRepository: backend NestJS non disponible'));
  }

  requestWithdrawal(request: WithdrawalRequest): Observable<WithdrawalResult> {
    return throwError(() => new Error('EarningsRepository: backend NestJS non disponible'));
  }
}
