import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowUpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ride-history-card',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonImg, IonText, IonButton, IonIcon],
  templateUrl: './app-ride-history-card.component.html',
  styleUrls: ['./app-ride-history-card.component.scss'],
})
export class AppRideHistoryCardComponent {
  @Input() plateNumber = '';
  @Input() dateLabel = '';
  @Input() fareLabel = '';
  @Input() mapImageUrl = '';

  @Output() cardClick = new EventEmitter<void>();

  constructor() {
    addIcons({ arrowUpOutline });
  }

  onOpen(): void {
    this.cardClick.emit();
  }
}
