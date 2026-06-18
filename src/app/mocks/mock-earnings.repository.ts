import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IEarningsRepository } from '../core/interfaces/i-earnings.repository';
import {
  EarningEntry,
  EarningsSummary,
  WithdrawalRequest,
  WithdrawalResult,
} from '../models/earning.model';
import earningsFixture from './fixtures/earnings.json';
import { mockDelay, shouldSimulateError } from './mock-delay';

@Injectable()
export class MockEarningsRepository implements IEarningsRepository {
  getDailyEarnings(): Observable<EarningsSummary> {
    return of(earningsFixture.daily as EarningsSummary).pipe(mockDelay());
  }

  getWeeklyEarnings(): Observable<EarningsSummary> {
    return of(earningsFixture.weekly as EarningsSummary).pipe(mockDelay());
  }

  getHistory(): Observable<EarningEntry[]> {
    return of(earningsFixture.history as EarningEntry[]).pipe(mockDelay());
  }

  requestWithdrawal(request: WithdrawalRequest): Observable<WithdrawalResult> {
    if (request.amount < 1000) {
      return throwError(() => new Error('Montant minimum non atteint')).pipe(mockDelay());
    }
    if (shouldSimulateError(0.08)) {
      return throwError(() => new Error('Service de retrait indisponible')).pipe(mockDelay());
    }
    return of({
      success: true,
      transactionId: `wd-${Date.now()}`,
      message: 'Demande de retrait enregistrée',
    }).pipe(mockDelay(800, 1500));
  }
}
