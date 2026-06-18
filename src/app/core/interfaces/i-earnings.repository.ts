import { Observable } from 'rxjs';
import {
  EarningEntry,
  EarningsSummary,
  WithdrawalRequest,
  WithdrawalResult,
} from '../../models/earning.model';

export interface IEarningsRepository {
  getDailyEarnings(): Observable<EarningsSummary>;
  getWeeklyEarnings(): Observable<EarningsSummary>;
  getHistory(): Observable<EarningEntry[]>;
  requestWithdrawal(request: WithdrawalRequest): Observable<WithdrawalResult>;
}
