import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  carOutline,
  documentTextOutline,
  helpCircleOutline,
  locationOutline,
  logOutOutline,
  person,
  personOutline,
  statsChartOutline,
} from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { AppCircleIconButtonComponent } from '../app-circle-icon-button/app-circle-icon-button.component';
import { DriverMenuItem } from './app-driver-menu.model';

@Component({
  selector: 'app-driver-menu',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonAvatar,
    IonImg,
    IonText,
    TranslatePipe,
    AppCircleIconButtonComponent,
  ],
  templateUrl: './app-driver-menu.component.html',
  styleUrls: ['./app-driver-menu.component.scss'],
})
export class AppDriverMenuComponent {
  @Input() fullName = '';
  @Input() photoUrl = '';
  @Input() menuItems: DriverMenuItem[] = [];

  @Output() backClick = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<string>();
  @Output() logoutClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      arrowBackOutline,
      person,
      personOutline,
      statsChartOutline,
      documentTextOutline,
      locationOutline,
      carOutline,
      helpCircleOutline,
      logOutOutline,
    });
  }

  onBack(): void {
    this.backClick.emit();
  }

  onItemClick(itemId: string): void {
    this.menuItemClick.emit(itemId);
  }

  onLogout(): void {
    this.logoutClick.emit();
  }
}
