import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { DriverRideHistoryService } from '../../../../services/driver/driver-ride-history.service';
import { AppDetailInfoRowComponent } from '../../../../shared/ui-kit/app-detail-info-row/app-detail-info-row.component';
import { AppDriverSubpageHeaderComponent } from '../../../../shared/ui-kit/app-driver-subpage-header/app-driver-subpage-header.component';
import { AppRouteTimelineComponent } from '../../../../shared/ui-kit/app-route-timeline/app-route-timeline.component';

@Component({
  selector: 'app-driver-history-detail',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonImg,
    IonIcon,
    IonText,
    TranslatePipe,
    AppDriverSubpageHeaderComponent,
    AppDetailInfoRowComponent,
    AppRouteTimelineComponent,
  ],
  templateUrl: './driver-history-detail.page.html',
  styleUrls: ['./driver-history-detail.page.scss'],
})
export class DriverHistoryDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly historyService = inject(DriverRideHistoryService);

  readonly ride = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.historyService.getById(id);
  });

  constructor() {
    addIcons({ person });
  }

  get fareLabel(): string {
    const ride = this.ride();
    return ride ? this.historyService.formatCurrency(ride.fareAmount) : '';
  }
}
