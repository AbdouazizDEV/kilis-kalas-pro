import { Component, Input } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';
import { DashboardChartBar } from '../../../models/driver-dashboard.model';

@Component({
  selector: 'app-earnings-bar-chart',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText],
  templateUrl: './app-earnings-bar-chart.component.html',
  styleUrls: ['./app-earnings-bar-chart.component.scss'],
})
export class AppEarningsBarChartComponent {
  @Input() bars: DashboardChartBar[] = [];

  private readonly chartHeightPx = 175;

  get isDense(): boolean {
    return this.bars.length > 7;
  }

  barHeight(bar: DashboardChartBar): number {
    const maxValue = Math.max(...this.bars.map((item) => item.value), 1);
    const minHeight = 12;
    const ratio = bar.value / maxValue;
    return Math.max(minHeight, Math.round(ratio * this.chartHeightPx));
  }
}
