import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';
import { DriverRideHistoryService } from '../../../../services/driver/driver-ride-history.service';
import { AppDriverSubpageHeaderComponent } from '../../../../shared/ui-kit/app-driver-subpage-header/app-driver-subpage-header.component';
import { AppRideHistoryCardComponent } from '../../../../shared/ui-kit/app-ride-history-card/app-ride-history-card.component';

@Component({
  selector: 'app-driver-history',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    AppDriverSubpageHeaderComponent,
    AppRideHistoryCardComponent,
  ],
  templateUrl: './driver-history.page.html',
  styleUrls: ['./driver-history.page.scss'],
})
export class DriverHistoryPage {
  private readonly router = inject(Router);
  private readonly historyService = inject(DriverRideHistoryService);

  readonly items = this.historyService.getHistory();

  openDetail(id: string): void {
    void this.router.navigate(['/driver/history', id]);
  }

  fareLabel(amount: number): string {
    return this.historyService.formatCurrency(amount);
  }
}
