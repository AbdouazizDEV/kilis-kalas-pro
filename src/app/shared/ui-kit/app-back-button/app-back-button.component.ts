import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [IonButton, IonIcon],
  templateUrl: './app-back-button.component.html',
  styleUrls: ['./app-back-button.component.scss'],
})
export class AppBackButtonComponent {
  @Input() defaultHref = '';

  constructor(private readonly location: Location) {
    addIcons({ arrowBackOutline });
  }

  goBack(): void {
    this.location.back();
  }
}
