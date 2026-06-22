import { Injectable } from '@angular/core';
import {
  DashboardChartBar,
  DashboardDayOption,
  DashboardPeriod,
  DashboardPaymentMethod,
  DashboardSummary,
  DashboardViewModel,
} from '../../models/driver-dashboard.model';

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const WEEK_CHART_VALUES = [5_000, 9_000, 15_000, 30_000, 20_000, 25_000, 1_000];
const MONTH_CHART_VALUES = [42_000, 38_000, 55_000, 48_000];
const YEAR_CHART_VALUES = [120_000, 98_000, 145_000, 132_000, 156_000, 148_000, 162_000, 171_000, 139_000, 158_000, 149_000, 183_000];

@Injectable({ providedIn: 'root' })
export class DriverDashboardService {
  getDashboard(period: DashboardPeriod, selectedDayId?: string): DashboardViewModel {
    const days = this.buildDays(period);
    const selectedId = selectedDayId && days.some((day) => day.id === selectedDayId)
      ? selectedDayId
      : days[0]?.id ?? '';

    return {
      period,
      days,
      selectedDayId: selectedId,
      chartBars: this.buildChartBars(period),
      summary: this.buildSummary(period, selectedId),
      paymentMethods: this.buildPaymentMethods(),
    };
  }

  formatCurrency(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} FCFA`;
  }

  formatCompactAmount(amount: number): string {
    if (amount >= 1_000) {
      const compact = amount / 1_000;
      return Number.isInteger(compact) ? `${compact}k` : `${compact.toFixed(1)}k`;
    }
    return `${amount}`;
  }

  private buildDays(period: DashboardPeriod): DashboardDayOption[] {
    if (period !== 'week') {
      return [];
    }

    const monday = this.getWeekStart(new Date());

    return WEEKDAY_LABELS.map((weekdayLabel, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      return {
        id: date.toISOString().slice(0, 10),
        weekdayLabel,
        dayNumber: date.getDate().toString().padStart(2, '0'),
      };
    });
  }

  private buildChartBars(period: DashboardPeriod): DashboardChartBar[] {
    const values = this.getChartValues(period);
    return values.map((value, index) => ({
      id: `${period}-${index}`,
      value,
      displayValue: this.formatCompactAmount(value),
    }));
  }

  private buildSummary(period: DashboardPeriod, selectedDayId: string): DashboardSummary {
    if (period === 'week' && selectedDayId) {
      const days = this.buildDays('week');
      const index = days.findIndex((day) => day.id === selectedDayId);
      const dayValue = index >= 0 ? WEEK_CHART_VALUES[index] : WEEK_CHART_VALUES[0];

      return {
        dayBalance: dayValue * 20,
        amountDue: Math.round(dayValue * 2),
      };
    }

    if (period === 'month') {
      return { dayBalance: 420_000, amountDue: 42_000 };
    }

    return { dayBalance: 1_680_000, amountDue: 168_000 };
  }

  private buildPaymentMethods(): DashboardPaymentMethod[] {
    return [
      {
        provider: 'wave',
        imageUrl: 'assets/icon/cadeWave.png',
      },
      {
        provider: 'orange_money',
        imageUrl: 'assets/icon/OrangM.png',
      },
    ];
  }

  private getChartValues(period: DashboardPeriod): number[] {
    switch (period) {
      case 'month':
        return MONTH_CHART_VALUES;
      case 'year':
        return YEAR_CHART_VALUES;
      default:
        return WEEK_CHART_VALUES;
    }
  }

  private getWeekStart(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }
}
