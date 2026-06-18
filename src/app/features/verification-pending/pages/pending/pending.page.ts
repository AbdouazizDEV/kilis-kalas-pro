import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-verification-pending',
  standalone: true,
  imports: [IonContent, IonIcon, TranslatePipe],
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class VerificationPendingPage {
  constructor() {
    addIcons({ timeOutline, checkmarkCircleOutline });
  }
}
