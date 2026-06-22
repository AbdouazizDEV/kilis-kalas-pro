import { Component, Input } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-info-row',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText],
  templateUrl: './app-detail-info-row.component.html',
  styleUrls: ['./app-detail-info-row.component.scss'],
})
export class AppDetailInfoRowComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() valueColor: 'default' | 'success' = 'default';
}
