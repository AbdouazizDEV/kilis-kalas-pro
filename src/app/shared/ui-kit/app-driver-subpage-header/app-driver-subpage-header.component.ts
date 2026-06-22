import { Component, Input } from '@angular/core';
import { IonCol, IonGrid, IonHeader, IonRow, IonText, IonToolbar } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../app-back-button/app-back-button.component';

@Component({
  selector: 'app-driver-subpage-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonText, TranslatePipe, AppBackButtonComponent],
  templateUrl: './app-driver-subpage-header.component.html',
  styleUrls: ['./app-driver-subpage-header.component.scss'],
})
export class AppDriverSubpageHeaderComponent {
  @Input() titleKey = '';
  @Input() backHref = '/driver/home';
}
