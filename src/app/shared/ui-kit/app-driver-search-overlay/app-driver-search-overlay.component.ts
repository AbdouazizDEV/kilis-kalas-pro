import { Component, EventEmitter, Output } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonSpinner,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { stop } from 'ionicons/icons';
import { AppCircleIconButtonComponent } from '../app-circle-icon-button/app-circle-icon-button.component';

@Component({
  selector: 'app-driver-search-overlay',
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonLabel,
    IonSpinner,
    TranslatePipe,
    AppCircleIconButtonComponent,
  ],
  templateUrl: './app-driver-search-overlay.component.html',
  styleUrls: ['./app-driver-search-overlay.component.scss'],
})
export class AppDriverSearchOverlayComponent {
  constructor() {
    addIcons({ stop });
  }

  @Output() stopClick = new EventEmitter<void>();
  @Output() locateClick = new EventEmitter<void>();
}
