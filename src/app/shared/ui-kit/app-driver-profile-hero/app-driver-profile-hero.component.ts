import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, createOutline, person } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { AppCircleIconButtonComponent } from '../app-circle-icon-button/app-circle-icon-button.component';

@Component({
  selector: 'app-driver-profile-hero',
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonImg,
    IonIcon,
    IonButton,
    IonText,
    AppCircleIconButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './app-driver-profile-hero.component.html',
  styleUrls: ['./app-driver-profile-hero.component.scss'],
})
export class AppDriverProfileHeroComponent {
  @Input() fullName = '';
  @Input() photoUrl = '';
  @Input() editable = true;

  @Output() backClick = new EventEmitter<void>();
  @Output() editPhotoClick = new EventEmitter<void>();

  constructor() {
    addIcons({ person, createOutline, arrowBackOutline });
  }

  onBack(): void {
    this.backClick.emit();
  }

  onEditPhoto(): void {
    this.editPhotoClick.emit();
  }
}
