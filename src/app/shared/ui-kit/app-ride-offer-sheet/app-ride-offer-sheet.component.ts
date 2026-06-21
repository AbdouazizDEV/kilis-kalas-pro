import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
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
import { locationOutline } from 'ionicons/icons';
import { RideRequest } from '../../../models/ride-request.model';

@Component({
  selector: 'app-ride-offer-sheet',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText, IonLabel, IonButton, IonImg, IonIcon, TranslatePipe],
  templateUrl: './app-ride-offer-sheet.component.html',
  styleUrls: ['./app-ride-offer-sheet.component.scss'],
})
export class AppRideOfferSheetComponent {
  constructor() {
    addIcons({ locationOutline });
  }

  @Input({ required: true }) ride!: RideRequest;
  @Input() serviceIconSrc = 'assets/icon/noto_package.svg';
  @Input() serviceLabelKey = 'DRIVER.HOME.DELIVERY';

  @Output() acceptClick = new EventEmitter<void>();
  @Output() refuseClick = new EventEmitter<void>();

  get formattedFare(): string {
    return `${this.ride.estimatedFare.toLocaleString('fr-FR')} FCFA`;
  }
}
