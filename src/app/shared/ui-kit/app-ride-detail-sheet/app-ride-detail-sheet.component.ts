import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { callOutline, chatbubbleOutline, locationOutline, person } from 'ionicons/icons';
import { RideRequest } from '../../../models/ride-request.model';

export type RideDetailMode = 'accepted' | 'at_pickup' | 'at_dropoff';

@Component({
  selector: 'app-ride-detail-sheet',
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonLabel,
    IonButton,
    IonImg,
    IonIcon,
    IonAvatar,
    TranslatePipe,
  ],
  templateUrl: './app-ride-detail-sheet.component.html',
  styleUrls: ['./app-ride-detail-sheet.component.scss'],
})
export class AppRideDetailSheetComponent {
  constructor() {
    addIcons({ locationOutline, person, chatbubbleOutline, callOutline });
  }

  @Input({ required: true }) ride!: RideRequest;
  @Input() mode: RideDetailMode = 'accepted';
  @Input() showHandle = true;
  @Input() serviceIconSrc = 'assets/icon/noto_package.svg';
  @Input() serviceLabelKey = 'DRIVER.HOME.DELIVERY';
  @Input() requesterPhotoUrl = '';

  @Output() primaryClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();
  @Output() messageClick = new EventEmitter<void>();
  @Output() callClick = new EventEmitter<void>();

  get formattedFare(): string {
    return `${this.ride.estimatedFare.toLocaleString('fr-FR')} FCFA`;
  }

  get requesterName(): string {
    return this.ride.requesterName ?? this.ride.passengerName;
  }

  get titleKey(): string {
    if (this.mode === 'at_pickup' || this.mode === 'at_dropoff') {
      return 'DRIVER.HOME.ARRIVED_TITLE';
    }
    return 'DRIVER.HOME.RIDE_TITLE';
  }

  get primaryActionKey(): string {
    switch (this.mode) {
      case 'at_pickup':
        return 'DRIVER.HOME.START_RIDE';
      case 'at_dropoff':
        return 'DRIVER.HOME.FINISH_RIDE';
      default:
        return 'DRIVER.HOME.GO_TO_DESTINATION';
    }
  }

  get showCancelAction(): boolean {
    return this.mode === 'at_pickup';
  }
}
