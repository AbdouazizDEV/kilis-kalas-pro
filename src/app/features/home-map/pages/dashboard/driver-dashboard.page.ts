import { Component, computed, inject, signal } from '@angular/core';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardPeriod } from '../../../../models/driver-dashboard.model';
import { DriverDashboardService } from '../../../../services/driver/driver-dashboard.service';
import { AppDashboardStatCardComponent } from '../../../../shared/ui-kit/app-dashboard-stat-card/app-dashboard-stat-card.component';
import { AppDriverSubpageHeaderComponent } from '../../../../shared/ui-kit/app-driver-subpage-header/app-driver-subpage-header.component';
import { AppEarningsBarChartComponent } from '../../../../shared/ui-kit/app-earnings-bar-chart/app-earnings-bar-chart.component';
import { AppPaymentMethodCardComponent } from '../../../../shared/ui-kit/app-payment-method-card/app-payment-method-card.component';
import { AppPeriodSegmentComponent, PeriodSegmentOption } from '../../../../shared/ui-kit/app-period-segment/app-period-segment.component';
import { AppWeekdayStripComponent } from '../../../../shared/ui-kit/app-weekday-strip/app-weekday-strip.component';

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonIcon,
    TranslatePipe,
    AppDriverSubpageHeaderComponent,
    AppPeriodSegmentComponent,
    AppWeekdayStripComponent,
    AppEarningsBarChartComponent,
    AppDashboardStatCardComponent,
    AppPaymentMethodCardComponent,
  ],
  templateUrl: './driver-dashboard.page.html',
  styleUrls: ['./driver-dashboard.page.scss'],
})
export class DriverDashboardPage {
  private readonly dashboardService = inject(DriverDashboardService);

  readonly periodOptions: PeriodSegmentOption[] = [
    { id: 'week', labelKey: 'DRIVER.DASHBOARD.PERIOD_WEEK' },
    { id: 'month', labelKey: 'DRIVER.DASHBOARD.PERIOD_MONTH' },
    { id: 'year', labelKey: 'DRIVER.DASHBOARD.PERIOD_YEAR' },
  ];

  readonly selectedPeriod = signal<DashboardPeriod>('week');
  readonly selectedDayId = signal<string>('');

  readonly dashboard = computed(() =>
    this.dashboardService.getDashboard(this.selectedPeriod(), this.selectedDayId() || undefined),
  );

  readonly showWeekdayStrip = computed(() => this.selectedPeriod() === 'week');

  readonly dayBalanceLabel = computed(() =>
    this.dashboardService.formatCurrency(this.dashboard().summary.dayBalance),
  );

  readonly amountDueLabel = computed(() =>
    this.dashboardService.formatCurrency(this.dashboard().summary.amountDue),
  );

  constructor() {
    addIcons({ informationCircleOutline });
    const initial = this.dashboardService.getDashboard('week');
    this.selectedDayId.set(initial.selectedDayId);
  }

  onPeriodChange(periodId: string): void {
    this.selectedPeriod.set(periodId as DashboardPeriod);
    const data = this.dashboardService.getDashboard(periodId as DashboardPeriod);
    this.selectedDayId.set(data.selectedDayId);
  }

  onDayChange(dayId: string): void {
    this.selectedDayId.set(dayId);
  }
}
