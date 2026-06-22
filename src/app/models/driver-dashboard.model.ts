export type DashboardPeriod = 'week' | 'month' | 'year';

export type PaymentProvider = 'wave' | 'orange_money';

export interface DashboardDayOption {
  id: string;
  weekdayLabel: string;
  dayNumber: string;
}

export interface DashboardChartBar {
  id: string;
  value: number;
  displayValue: string;
}

export interface DashboardSummary {
  dayBalance: number;
  amountDue: number;
}

export interface DashboardPaymentMethod {
  provider: PaymentProvider;
  imageUrl: string;
}

export interface DashboardViewModel {
  period: DashboardPeriod;
  days: DashboardDayOption[];
  selectedDayId: string;
  chartBars: DashboardChartBar[];
  summary: DashboardSummary;
  paymentMethods: DashboardPaymentMethod[];
}
