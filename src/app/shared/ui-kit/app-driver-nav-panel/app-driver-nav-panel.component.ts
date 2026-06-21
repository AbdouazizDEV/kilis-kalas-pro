import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppCircleIconButtonComponent } from '../app-circle-icon-button/app-circle-icon-button.component';

@Component({
  selector: 'app-driver-nav-panel',
  standalone: true,
  imports: [
    DecimalPipe,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonLabel,
    IonText,
    TranslatePipe,
    AppCircleIconButtonComponent,
  ],
  templateUrl: './app-driver-nav-panel.component.html',
  styleUrls: ['./app-driver-nav-panel.component.scss'],
})
export class AppDriverNavPanelComponent {
  @Input() remainingKm = 0;
  @Input() arriveIconSrc = 'assets/icon/Arrive.svg';

  @Output() menuClick = new EventEmitter<void>();
  @Output() arriveClick = new EventEmitter<void>();
}
