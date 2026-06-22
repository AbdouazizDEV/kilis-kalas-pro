import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard-stat-card',
  standalone: true,
  imports: [IonCard, IonCardContent, IonText],
  templateUrl: './app-dashboard-stat-card.component.html',
  styleUrls: ['./app-dashboard-stat-card.component.scss'],
})
export class AppDashboardStatCardComponent {
  @Input() label = '';
  @Input() value = '';
}
