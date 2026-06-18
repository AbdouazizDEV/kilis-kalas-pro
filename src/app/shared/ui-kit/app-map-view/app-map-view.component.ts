import { Component, Input } from '@angular/core';
import { IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mapOutline } from 'ionicons/icons';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [IonIcon, IonText],
  templateUrl: './app-map-view.component.html',
  styleUrls: ['./app-map-view.component.scss'],
})
export class AppMapViewComponent {
  @Input() placeholder = 'Carte — à connecter avec Google Maps';

  constructor() {
    addIcons({ mapOutline });
  }
}
