import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

export interface PeriodSegmentOption {
  id: string;
  labelKey: string;
}

@Component({
  selector: 'app-period-segment',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, TranslatePipe],
  templateUrl: './app-period-segment.component.html',
  styleUrls: ['./app-period-segment.component.scss'],
})
export class AppPeriodSegmentComponent {
  @Input() options: PeriodSegmentOption[] = [];
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
