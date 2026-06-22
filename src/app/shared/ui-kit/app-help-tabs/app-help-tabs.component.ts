import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

export interface HelpTabOption {
  id: string;
  labelKey: string;
}

@Component({
  selector: 'app-help-tabs',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, TranslatePipe],
  templateUrl: './app-help-tabs.component.html',
  styleUrls: ['./app-help-tabs.component.scss'],
})
export class AppHelpTabsComponent {
  @Input() options: HelpTabOption[] = [];
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
