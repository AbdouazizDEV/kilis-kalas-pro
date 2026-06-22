import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';
import { DashboardDayOption } from '../../../models/driver-dashboard.model';

@Component({
  selector: 'app-weekday-strip',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, IonText],
  templateUrl: './app-weekday-strip.component.html',
  styleUrls: ['./app-weekday-strip.component.scss'],
})
export class AppWeekdayStripComponent {
  @Input() days: DashboardDayOption[] = [];
  @Input() selectedId = '';

  @Output() selectedChange = new EventEmitter<string>();

  isSelected(id: string): boolean {
    return this.selectedId === id;
  }

  onSelect(id: string): void {
    if (id !== this.selectedId) {
      this.selectedChange.emit(id);
    }
  }
}
