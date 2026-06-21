import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { RideRequest } from '../../../models/ride-request.model';

@Component({
  selector: 'app-ride-completed-sheet',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText, IonLabel, IonButton, IonImg, IonAvatar, TranslatePipe],
  templateUrl: './app-ride-completed-sheet.component.html',
  styleUrls: ['./app-ride-completed-sheet.component.scss'],
})
export class AppRideCompletedSheetComponent {
  @Input({ required: true }) ride!: RideRequest;
  @Input() driverName = '';
  @Input() vehicleLabel = '';
  @Input() requesterPhotoUrl = '';
  @Input() completedAt = new Date();

  @Output() viewDetailsClick = new EventEmitter<void>();
  @Output() finishClick = new EventEmitter<void>();

  get formattedDate(): string {
    return this.completedAt.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  get requesterName(): string {
    return this.ride.requesterName ?? this.ride.passengerName;
  }
}
