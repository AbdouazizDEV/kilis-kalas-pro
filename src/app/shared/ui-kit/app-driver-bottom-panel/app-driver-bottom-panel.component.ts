import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppCircleIconButtonComponent } from '../app-circle-icon-button/app-circle-icon-button.component';

@Component({
  selector: 'app-driver-bottom-panel',
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
  templateUrl: './app-driver-bottom-panel.component.html',
  styleUrls: ['./app-driver-bottom-panel.component.scss'],
})
export class AppDriverBottomPanelComponent {
  @Input() online = false;
  @Input() navigating = false;
  @Input() remainingKm = 0;
  @Input() statsIconSrc = 'assets/icon/Group.svg';

  @Output() statsClick = new EventEmitter<void>();
  @Output() statusClick = new EventEmitter<void>();

  onStatsClick(): void {
    this.statsClick.emit();
  }

  onStatusClick(): void {
    this.statusClick.emit();
  }
}
