import { Component, Input } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [IonText],
  templateUrl: './app-stat-card.component.html',
  styleUrls: ['./app-stat-card.component.scss'],
})
export class AppStatCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() suffix = 'FCFA';
}
