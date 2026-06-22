import { Component, Input } from '@angular/core';
import { IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-route-timeline',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText, IonIcon, TranslatePipe],
  templateUrl: './app-route-timeline.component.html',
  styleUrls: ['./app-route-timeline.component.scss'],
})
export class AppRouteTimelineComponent {
  @Input() pickupLabel = '';
  @Input() dropoffLabel = '';

  constructor() {
    addIcons({ locationOutline });
  }
}
