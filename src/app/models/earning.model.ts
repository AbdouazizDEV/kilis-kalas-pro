export interface EarningEntry {
  id: string;
  rideId: string;
  amount: number;
  date: string;
  passengerName: string;
}

export interface EarningsSummary {
  total: number;
  rideCount: number;
  periodLabel: string;
}

export interface WithdrawalRequest {
  amount: number;
  method: 'wave' | 'orange_money' | 'bank';
  phone?: string;
}

export interface WithdrawalResult {
  success: boolean;
  transactionId?: string;
  message?: string;
}
